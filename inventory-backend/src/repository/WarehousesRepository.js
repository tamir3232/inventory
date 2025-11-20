const  {Warehouse}  = require("../database/models");

class WareHousesRepository {
  async findAll() {
    return Warehouse.findAll();
  }

  async findById(id) {

    return Warehouse.findByPk(id);
  }

  async create(data) {
    return Warehouse.create(data);
  }

  async update(id, data) {
    return Warehouse.update(data, { where: { id } });
  }

  async delete(id) {
    return Warehouse.destroy({ where: { id } });
  }
}

module.exports = new WareHousesRepository();