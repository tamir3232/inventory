const { Stocks } = require('../database/models')
const StocksService = require("../services/StocksService");


const getProduct = async(req,res,next) =>{
    try {
        const stocks = await StocksService.getAll();
        return res.status(200).json({
            message:'Stocks Product',
            data :stocks,
            })
    } catch (error) {
        next(error)
    }

}



module.exports = {getProduct}




// exports.index = async (req, res) => {
//   res.json({ message: "GET /products" });
// };
