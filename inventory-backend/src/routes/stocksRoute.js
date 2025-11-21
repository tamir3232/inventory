
const express = require("express");
const router = express.Router();
const controller = require("../controllers/stocksController");

router.get("/", controller.getStock);



module.exports = router;
