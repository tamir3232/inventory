const { Product } = require('../database/models')
const ProductService = require("../services/ProductsService");


const getProduct = async(req,res,next) =>{
    try {
        const product = await ProductService.getAll();
        return res.status(200).json({
            message:'Product',
            data :product,
            })
    } catch (error) {
        next(error)
    }

}



module.exports = {getProduct}




// exports.index = async (req, res) => {
//   res.json({ message: "GET /products" });
// };
