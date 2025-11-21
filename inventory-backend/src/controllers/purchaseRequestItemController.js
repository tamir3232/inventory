const purchaseRequestItemService = require("../services/PurchaseRequestItemService");


const DeletePlaningPurchaseRequestItem = async (req, res, next) => {
  try {
    const id = req.params.id;
    await purchaseRequestItemService.deletePlaningPurchaseRequestItem(id);
    return res.status(200).json({
      message: "Purchase Item Request Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}



module.exports = {
 
  DeletePlaningPurchaseRequestItem
};