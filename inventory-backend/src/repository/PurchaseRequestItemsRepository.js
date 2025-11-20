const {PurchaseRequestItem} = require("../database/models");

class PurchaseRequestItemsRepository {
  async findAll() {
    return PurchaseRequestItem.findAll();
  }

  async findById(id) {
    return PurchaseRequestItem.findByPk(id);
  }

  async create(data, t = null) {
    return PurchaseRequestItem.create(data, { transaction: t });
  }

  async update(id, data,t = null) {
    return PurchaseRequestItem.update(data, { where: { id }, transaction: t });
  }

  async delete(id) {
    return PurchaseRequestItem.destroy({ where: { id } });
  }
}

module.exports = new PurchaseRequestItemsRepository();  