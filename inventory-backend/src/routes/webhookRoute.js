
const express = require("express");
const router = express.Router();
const controller = require("../controllers/webhookController");

router.post("/receive-stock", controller.postWebhook);

module.exports = router;
