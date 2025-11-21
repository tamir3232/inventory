const controller = require("../controllers/purchaseRequestItemController");
const express = require("express");
const router = express.Router();




router.delete("/:id",controller.DeletePlaningPurchaseRequestItem);


module.exports = router;
