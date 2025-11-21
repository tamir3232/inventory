const WarehousesService = require("../services/WarehousesService");


const getWarehouse = async(req,res,next) =>{
    try {
        const product = await WarehousesService.findAll();
        return res.status(200).json({
            message:'Product',
            data :product,
            })
    } catch (error) {
        next(error)
    }

}



module.exports = {getWarehouse}

