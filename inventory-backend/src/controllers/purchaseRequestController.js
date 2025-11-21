const purchaseRequestService = require("../services/PurchaseRequestService");


const createPlaningPurchaseRequest = async (req, res, next) => {
  try {
    const data = req.body;
    const purchaseRequest = await purchaseRequestService.createPlaningPurchaseRequest(data);
    return res.status(201).json({
      message: "Purchase Request Created Successfully",
      data: purchaseRequest,
    });
  } catch (error) {
    next(error);
  }
}

const UpdatePlaningPurchaseRequest = async (req, res, next) => {
  try {
    const data = req.body;
    const param = req.params;
    const purchaseRequest = await purchaseRequestService.updatePlaningPurchaseRequest(data,param);
    return res.status(201).json({
      message: "Purchase Request Created Successfully",
      data: purchaseRequest,
    });
  } catch (error) {
    next(error);
  }
}

const DeletePlaningPurchaseRequest = async (req, res, next) => {
  try {
    const id = req.params.id;
    await purchaseRequestService.deletePlaningPurchaseRequest(id);
    return res.status(200).json({
      message: "Purchase Request Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
}

const GetDetailPlaningPurchaseRequest = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await purchaseRequestService.findOne(id);
    return res.status(200).json({
      message: "Purchase Request Get Detail Successfully",
      data : data
    });
  } catch (error) {
    next(error);
  }
}

const GetPlaningPurchaseRequest = async (req, res, next) => {
    try {
        const purchaseRequest = await purchaseRequestService.findAll();
        return res.status(200).json({
              message:'purchaseRequest',
              data :purchaseRequest,
            })
    } catch (error) {
        next(error)
    }
}


module.exports = {
  createPlaningPurchaseRequest,
  UpdatePlaningPurchaseRequest,
  DeletePlaningPurchaseRequest,
  GetPlaningPurchaseRequest,
  GetDetailPlaningPurchaseRequest
};