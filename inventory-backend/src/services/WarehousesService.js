const WarehHousesRepository  = require("../repository/WarehousesRepository");



class WarehousesService {

    async findById(id) {
        return await WarehHousesRepository.findById(id);
    }   
    async findAll(){
        return await WarehHousesRepository.findAll();
    }

}


module.exports = new WarehousesService();
