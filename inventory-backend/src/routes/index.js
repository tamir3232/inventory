
const express = require("express");
const router = express.Router();

router.use("/products", require("./productsRoute"));
router.use("/stocks", require("./stocksRoute"));
router.use("/purchase", require("./purchaseRequestRoute"));
router.use("/purchase-item", require("./purchaseRequestItemRoute"));
router.use("/webhook", require("./webhookRoute"));
router.use("/warehouse", require("./warehouseRoute"));





module.exports = router;
