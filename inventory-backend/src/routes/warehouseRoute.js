
const express = require("express");
const router = express.Router();
const controller = require("../controllers/WarehouseController");

router.get("/", controller.getWarehouse);



module.exports = router;
