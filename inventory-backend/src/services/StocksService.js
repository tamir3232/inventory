const { Stock } = require("../database/models");
const StocksRepository  = require("../repository/StocksRepository");
const  {Warehouse}  = require("../database/models");
const { Product } = require("../database/models");



class StocksService {

 async getAll() {
    return await StocksRepository.findAll();
  }


}


module.exports = new StocksService();
