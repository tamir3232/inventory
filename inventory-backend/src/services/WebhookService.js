const ProductsRepository = require("../repository/ProductsRepository");
const purchaseRequestRepository = require ("../repository/PurchaseRequestRepository");
const StockRepository = require("../repository/StocksRepository");

class webhookService {
    async processWebhook(req) {
        const t = await sequelize.transaction();

        try {
            const purchaseRequest = await purchaseRequestRepository.findByReference(req.reference);
            if(!purchaseRequest){
                throw {
                    code: 404,
                    message: `Purchase Request with reference ${req.reference} not found`
                };
            }

            if(purchaseRequest.status === 'COMPLETED'){
                throw {
                    code: 400,
                    message: `Purchase Request with reference ${req.reference} already completed`
                };
            }

            for (const detail of req.details) {
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
            await t.commit();
            const updatePurchase = await purchaseRequestRepository.update(purchaseRequest.id, {status: 'COMPLETED'},t);

            return purchaseRequest;
        } catch (error) {
            await t.rollback();
            throw error;
        }
        
        
    }
}
module.exports = new webhookService();
       