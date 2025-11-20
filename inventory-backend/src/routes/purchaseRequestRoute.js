const validation = require("../middleware/ValidationMiddleware");
const express = require("express");
const {PurchaseRequestSchema,UpdatePurchaseRequestSchema} = require("../schema/PurchaseRequestSchema");
const router = express.Router();
const controller = require("../controllers/purchaseRequestController");

router.post("/request/", validation(PurchaseRequestSchema),controller.createPlaningPurchaseRequest);
router.put("/request/:id", validation(UpdatePurchaseRequestSchema),controller.UpdatePlaningPurchaseRequest);
router.delete("/request/:id",controller.DeletePlaningPurchaseRequest);



module.exports = router;
