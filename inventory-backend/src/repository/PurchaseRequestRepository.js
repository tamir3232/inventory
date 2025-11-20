const {PurchaseRequest} = require("../database/models");

class purchaseRequestRepository {

    async findAll() {
      return PurchaseRequest.findAll();
    }

   async findByReference(reference) {
    return PurchaseRequest.findOne({
            where: {
                reference: reference 
            }
        });
  }

  async findById(id) {
    return PurchaseRequest.findByPk(id);
  }
  
  async create(data,t = null) {
    return PurchaseRequest.create({
        warehouse_id : data.warehouseId,
        reference : data.reference,
        status : data.status,
    }, { transaction: t });
  }

   async update(id, data,t = null) {   
    return PurchaseRequest.update({
        warehouse_id : data.warehouseId,
        status : data.status,
    }, { where: { id }, transaction: t });
  }

   async delete(id) {
    return PurchaseRequest.destroy({ where: { id } });
  }     
  
}

module.exports = new purchaseRequestRepository();