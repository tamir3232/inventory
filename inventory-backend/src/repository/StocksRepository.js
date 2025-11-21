const { Stock } = require("../database/models");

class StocksRepository {
  async findAll(options={}) {
    return Stock.findAll(options);
  }

  async findById(id) {
    return Stock.findByPk(id);
  }

  async create(data, t = null) {
    return Stock.create(data, { transaction: t });
  }

  async update(id, data) {
    return Stock.update(data, { where: { id } });
  }

  async updateStockByProductAndWarehouse(warehouseId, productId, data,t=null) {    
   return Stock.update(data, { 
      where: { 
        warehouse_id: warehouseId, 
        product_id: productId 
      } 
    }, { transaction: t });
  }

  async findByProductAndWarehouse(warehouseId, productId) {    
   return Stock.findOne({
      where: {
        warehouse_id: warehouseId, 
        product_id: productId 
      }
    });
  }

  async delete(id) {
    return Stock.destroy({ where: { id } });
  }
}

module.exports = new StocksRepository();
