
const express = require("express");
const router = express.Router();
const controller = require("../controllers/stocksController");

router.get("/", controller.getProduct);

module.exports = router;
