const { Stock } = require("../database/models");

class StocksRepository {
  async findAll() {
    return Stock.findAll();
  }

  async findById(id) {
    return Stock.findByPk(id);
  }

  async create(data) {
    return Stock.create(data);
  }

  async update(id, data) {
    return Stock.update(data, { where: { id } });
  }

  async delete(id) {
    return Stock.destroy({ where: { id } });
  }
}

module.exports = new StocksRepository();
