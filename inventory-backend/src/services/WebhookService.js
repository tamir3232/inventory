const ProductsRepository = require("../repository/ProductsRepository");
const purchaseRequestRepository = require ("../repository/PurchaseRequestRepository");
const StockRepository = require("../repository/StocksRepository");
const { sequelize } = require('../database/models');

class webhookService {
    async processWebhook(req) {
        const t = await sequelize.transaction();

        try {
            console.log(`Processing webhook for Purchase Request reference: ${req.data.reference}`);
            const purchaseRequest = await purchaseRequestRepository.findByReference(req.data.reference);
            if(!purchaseRequest){
                throw {
                    code: 404,
                    message: `Purchase Request with reference ${req.data.reference} not found`
                };
            }

            if(purchaseRequest.status === 'COMPLETED'){
                throw {
                    code: 400,
                    message: `Purchase Request with reference ${req.data.reference} already completed`
                };
            }

            for (const detail of req.data.details) {
                console.log(`Processing item product_name: ${detail.product_name}, quantity: ${detail.qty} for warehouseId: ${purchaseRequest.warehouse_id}`);

                const getProduct = await ProductsRepository.findBySku(detail.sku_barcode);

                if(!getProduct){
                    throw {
                        code: 404,
                        message: `Product with SKU ${detail.sku_barcode} not found`
                    };
                }
                console.log(`Found product ID ${getProduct.id} for SKU ${detail.sku_barcode}`);
                const getStockExist = await StockRepository.findByProductAndWarehouse( purchaseRequest.warehouse_id,getProduct.id,);
                console.log(`Current stock for product ID ${getProduct.id} in warehouse ID ${purchaseRequest.warehouse_id}:`, getStockExist ? getStockExist.quantity : 0);

                const stocks = await StockRepository.updateStockByProductAndWarehouse( purchaseRequest.warehouse_id, getProduct.id,{quantity : getStockExist.quantity + detail.qty},t );

            }
            const updatePurchase = await purchaseRequestRepository.update(purchaseRequest.id, {status: 'COMPLETED'},t);
            await t.commit();

            return purchaseRequest;
        } catch (error) {
            await t.rollback();
            throw error;
        }
        
        
    }
}
module.exports = new webhookService();
       