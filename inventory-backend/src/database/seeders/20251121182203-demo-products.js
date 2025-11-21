'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Data produk FOOM (Devices & Liquids)
    const products = [
      {
        name: "FOOM Pod X Signature - Space Grey",
        sku: "FOOM-DEV-X-SG",
      },
      {
        name: "FOOM Pod X Signature - Wild Purple",
        sku: "FOOM-DEV-X-WP",
      },
      {
        name: "FOOM Pod X Signature - Corduroy Beige",
        sku: "FOOM-DEV-X-CB",
      },
      {
        name: "FOOM Liquid - Ice Tea (Saltnic 30ml)",
        sku: "FOOM-LIQ-ICE-TEA",
      },
      {
        name: "FOOM Liquid - Iced Berry (Saltnic 30ml)",
        sku: "FOOM-LIQ-ICE-BERRY",
      },
      {
        name: "FOOM Liquid - Iced Cappuccino (Saltnic 30ml)",
        sku: "FOOM-LIQ-ICE-CAPP",
      },
      {
        name: "FOOM Cartridge Refillable 0.8 Ohm (3 Pcs)",
        sku: "FOOM-ACC-CART-08",
      },
      {
        name: "FOOM Lanyard - Black",
        sku: "FOOM-ACC-LANYARD-BLK",
      }
    ];

    // Tambahkan createdAt dan updatedAt ke setiap item
    const productsWithTimestamp = products.map(product => ({
      ...product,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // Insert data ke tabel 'products'
    return queryInterface.bulkInsert('products', productsWithTimestamp, {});
  },

  async down (queryInterface, Sequelize) {
    // Hapus semua data dari tabel 'products' jika seeder di-undo
    return queryInterface.bulkDelete('products', null, {});
  }
};