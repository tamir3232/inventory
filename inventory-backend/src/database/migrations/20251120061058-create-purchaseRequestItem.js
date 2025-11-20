"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchase_request_items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      purchase_request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "purchase_requests",
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("purchase_request_items");
  },
};
