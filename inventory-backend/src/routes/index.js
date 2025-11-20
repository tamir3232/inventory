
const express = require("express");
const router = express.Router();

router.use("/products", require("./productsRoute"));
router.use("/stocks", require("./stocksRoute"));
router.use("/purchase-request", require("./purchaseRequestRoute"));
router.use("/webhook", require("./webhookRoute"));




module.exports = router;
