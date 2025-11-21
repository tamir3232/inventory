'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Data Gudang di area Jabodetabek
    const warehouses = [
      {
        name: "Main Hub Jakarta (Cakung DC)", // Pusat logistik umum di Jkt Timur
      },
      {
        name: "West Java Hub (Cikarang Industrial)", // Area industri Bekasi
      },
      {
        name: "Tangerang Distribution Center (Cikupa)", // Area industri Tangerang
      },
      {
        name: "South Tangerang HQ Storage (BSD City)", // Kantor Pusat/Gudang Kecil
      },
      {
        name: "Bogor Satellite Warehouse (Sentul)", // Gudang penyangga Bogor
      },
      {
        name: "Depok Transit Point (Cimanggis)", // Titik transit Depok
      }
    ];

    // Tambahkan createdAt dan updatedAt
    const warehousesWithTimestamp = warehouses.map(wh => ({
      ...wh,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert ke tabel 'warehouses'
    return queryInterface.bulkInsert('warehouses', warehousesWithTimestamp, {});
  },

  async down (queryInterface, Sequelize) {
    // Hapus semua data warehouse
    return queryInterface.bulkDelete('warehouses', null, {});
  }
};