const { Product } = require("../database/models");

class ProductRepository {
  async findAll() {
    return Product.findAll();
  }

  async findById(id) {
    return Product.findByPk(id);
  }

  async create(data) {
    return Product.create(data);
  }

  async update(id, data) {
    return Product.update(data, { where: { id } });
  }

  async delete(id) {
    return Product.destroy({ where: { id } });
  }
}

module.exports = new ProductRepository();
