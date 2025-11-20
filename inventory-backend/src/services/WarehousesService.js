const WarehHousesRepository  = require("../repository/WarehousesRepository");



class WarehousesService {

    async findById(id) {
        return await WareHousesRepository.findById(id);
    }   

}


module.exports = new WarehousesService();
