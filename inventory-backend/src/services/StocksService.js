const { Stock } = require("../database/models");
const StocksRepository  = require("../repository/StocksRepository");



class StocksService {

 async getAll() {
    return await StocksRepository.findAll();
  }


}


module.exports = new StocksService();
