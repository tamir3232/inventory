const PurchaseRequestItemsRepository = require("../repository/PurchaseRequestItemsRepository");
const PurchaseRequestRepository = require("../repository/PurchaseRequestRepository");


class purchaseRequestItemService {
     async deletePlaningPurchaseRequestItem(id) {

            const purchaseItem = await PurchaseRequestItemsRepository.findById(id);

            if(!purchaseItem){
                 throw {
                    code: 404,
                    message: `Purchase Request with ID ${id} not found`
                };
            }
            const purchaseRequest = await PurchaseRequestRepository.findById(purchaseItem.purchase_request_id)

            if(purchaseRequest.status != "DRAFT"){
                throw {
                    code: 400,
                    message: `Only Purchase Requests with status DRAFT can be deleted Purchase Item`
                };
            }




            return PurchaseRequestItemsRepository.delete(id);
        }

}


module.exports = new purchaseRequestItemService();
