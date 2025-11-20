
const express = require("express");
const router = express.Router();
const controller = require("../controllers/purchaseRequestController");

router.get("/", controller.index);

module.exports = router;
