const { Product } = require("../database/models");
const ProductRepository  = require("../repository/ProductsRepository");

class ProductService {

  async getAll() {
    return await ProductRepository.findAll();
  }

  async getById(id) {
    const product = await ProductRepository.findById(id);
    if (!product) {
      throw{
            code:400,
            message:"Product Not Found"
        }
    }
    return product;
  }

  async create(data) {
    return await ProductRepository.create(data);
  }

  async update(id, data) {
    const product = await Product.findByPk(id);
    if (!product) {
      throw{
            code:400,
            message:"Product Not Found"
        }
    }

    await ProductRepository.update(data);
    return product;
  }

  async delete(id) {
    const product = await ProductRepository.delete(id);
    if (!product) {
      throw{
            code:400,
            message:"Product Not Found"
        }
    }
    await product.destroy();
    return true;
  }
}

module.exports = new ProductService();
