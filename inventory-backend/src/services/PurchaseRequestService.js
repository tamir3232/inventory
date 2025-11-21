const { PurchaseRequestSchema } = require("../schema/PurchaseRequestSchema");
const  ProductService  = require("./ProductsService");    
const wareHouseRepository = require ("../repository/WarehousesRepository");
const purchaseRequestRepository = require ("../repository/PurchaseRequestRepository");
const PurchaseRequestItemsRepository = require("../repository/PurchaseRequestItemsRepository");
const { sequelize } = require('../database/models');
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL;
const secretKey = process.env.SECRET_KEY;

class purchaseRequestService {

    async createPlaningPurchaseRequest(request) { 
        const t = await sequelize.transaction();
        try {
            const warehouseClarify = await wareHouseRepository.findById(request.warehouseId);
            if (!warehouseClarify) {
                throw {
                    code: 404,
                    message: `Warehouse with ID ${request.warehouseId} not found`
                };
            }
            const checkReference = await purchaseRequestRepository.findByReference(request.reference);
            if (checkReference) {
                throw {
                    code: 400,
                    message: `Reference ${request.reference} already exists`,
                    field: 'reference'
                };
            }
            request.status = 'DRAFT';
            const createPlaningPurchaseRequest = await purchaseRequestRepository.create(request,t);
            for (const item of request.items) {
                console.log(`Processing productId: ${item.productId}, quantity: ${item.quantity} for warehouseId: ${request.warehouseId}`);
                let product = await ProductService.getById(item.productId);
                if (!product) {
                    throw {
                        code: 404,
                        message: `Product with ID ${item.productId} not found`
                    };
                }
                
                let dataItem = { 
                    product_id: item.productId,
                    quantity: item.quantity,
                    purchase_request_id: createPlaningPurchaseRequest.id,
                    
                }
                console.log(`Creating PurchaseRequestItem with data:`, dataItem);
                await PurchaseRequestItemsRepository.create(dataItem,t);
                console.log(`Created PurchaseRequestItem for productId: ${item.productId}`);    
            }
            await t.commit();
            return createPlaningPurchaseRequest;
        } catch (error) {
            await t.rollback();
            throw error;
        }
        
    }      


    async updatePlaningPurchaseRequest(request, param) { 
        const t = await sequelize.transaction();
        try {
            const warehouseClarify = await wareHouseRepository.findById(request.warehouseId);
            if (!warehouseClarify) {
                throw {
                    code: 404,
                    message: `Warehouse with ID ${request.warehouseId} not found`
                };
            }
            const checkReference = await purchaseRequestRepository.findById(param.id);
            if (!checkReference) {
                throw {
                    code: 404,
                    message: `Purchase Request with ID ${param.id} not found`
                };
            }
            if(checkReference.status != "DRAFT"){
                console.log(checkReference.status)
                throw {
                    code: 400,
                    message: `Only Purchase Requests with status DRAFT can be UPDATED`
                };
            }
            const createPlaningPurchaseRequest = await purchaseRequestRepository.update(param.id, request,t);
            let total = 0;
            let details = [];
            for (const item of request.items) {
                console.log(`Processing  quantity: ${item.quantity} for warehouseId: ${request.warehouseId}`);
                let product = await ProductService.getById(item.productId);
                if (!product) {
                    throw {
                        code: 404,
                        message: `Product with ID ${item.productId} not found`
                    };
                }
                if(!item.id){
                    let dataItem = { 
                        product_id: item.productId,
                        quantity: item.quantity,
                        purchase_request_id: param.id,
                    }
                    console.log(`Creating PurchaseRequestItem with data:`, dataItem);
                    await PurchaseRequestItemsRepository.create(dataItem,t);
                    console.log(`Created PurchaseRequestItem for productId: ${item.productId}`);    
                    total += item.quantity;
                    details.push({
                        "product_name": product.name,
                        "qty": item.quantity,
                        "purchase_request_id" : param.id
                    });
                    continue;
                }
                else{
                    let PurchaseRequestItemDataExist = await PurchaseRequestItemsRepository.findById(item.id);
                    if (!PurchaseRequestItemDataExist) {
                        throw {
                            code: 404,
                            message: `Purchase Request Item with ID ${item.id} not found`
                        };
                    }
                    if (PurchaseRequestItemDataExist.purchase_request_id != param.id) {
                        throw {
                            code: 400,
                            message: `Purchase Request Item with ID ${item.id} does not belong to Purchase Request ID ${param.id}`
                        };
                    }
                    let dataItem = { 
                        product_id: item.productId,
                        quantity: item.quantity,
                    }
                    console.log(`Updating PurchaseRequestItem ID ${item.id} with data:`, dataItem);
                    await PurchaseRequestItemsRepository.update(item.id, dataItem,t);
                    console.log(`Updated PurchaseRequestItem ID ${item.id}`);    
                    total += item.quantity;
                }
                
               
                
                details.push({
                    "product_name": product.name,
                    "qty": item.quantity,
                    "sku_barcode" : product.sku_barcode
                });
            }

            if(request.status && request.status === 'PENDING'){
                const payload = { 
                    "vendor" : request.vendor,
                    "reference" : checkReference.reference,
                    "qty_total" : total,
                    "details" : details
                };
                const finalPayload = {
                    webhook_response: payload 
                };
                let responseExternal = await this.sendPrToExternalHubFetch(EXTERNAL_API_URL, finalPayload, secretKey);    
                console.log('Successfully sent Purchase Request to External Hub' + responseExternal);
            };
            await t.commit();
            return createPlaningPurchaseRequest;
        } catch (error) {
            await t.rollback();
            throw error;
        }
        
    }  


    async sendPrToExternalHubFetch(url, payload, secretKey) {
        try {
            const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'secret-key': secretKey,
            },
            body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json(); 
                throw new Error(`External Hub Failed with status ${response.status}: ${JSON.stringify(errorBody)}`);
            }
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Fetch error:', error.message);
            throw error;
        }

    }

    async deletePlaningPurchaseRequest(id) {
        let checkStatus = await purchaseRequestRepository.findById(id);
        if (!checkStatus) {
            throw {
                code: 404,
                message: `Purchase Request with ID ${id} not found`
            };
        }
        if (checkStatus.status !== 'DRAFT') {
            throw {
                code: 400,
                message: `Only Purchase Requests with status DRAFT can be deleted`
            };
        }
        return purchaseRequestRepository.delete(id);
    }

    async findAll() {
        const purchaseRequests = await purchaseRequestRepository.findAll();

        const result = [];

        for (const req of purchaseRequests) {
            const items = await PurchaseRequestItemsRepository.findByPurchaseRequestId(req.id);

            const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

            result.push({
            ...req.dataValues,
            totalQty,
            items
            });
        }

        return result;
    }

    async findOne(id) {
        const purchaseRequests = await purchaseRequestRepository.findById(id);

        if(!purchaseRequests){
             throw {
                code: 404,
                message: `Purchase Request with ID ${id} not found`
            };
        }

        return purchaseRequests

   
    }



}


module.exports = new purchaseRequestService();
