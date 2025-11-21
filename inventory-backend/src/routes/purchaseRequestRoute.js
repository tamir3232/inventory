const validation = require("../middleware/ValidationMiddleware");
const express = require("express");
const {PurchaseRequestSchema,UpdatePurchaseRequestSchema} = require("../schema/PurchaseRequestSchema");
const router = express.Router();
const controller = require("../controllers/purchaseRequestController");

router.post("/request/", validation(PurchaseRequestSchema),controller.createPlaningPurchaseRequest);
router.put("/request/:id", validation(UpdatePurchaseRequestSchema),controller.UpdatePlaningPurchaseRequest);
router.delete("/request/:id",controller.DeletePlaningPurchaseRequest);
router.get("/request",controller.GetPlaningPurchaseRequest);
router.get("/request/:id",controller.GetDetailPlaningPurchaseRequest);





module.exports = router;
