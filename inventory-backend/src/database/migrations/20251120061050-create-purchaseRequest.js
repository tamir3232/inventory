"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("purchase_requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reference: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("DRAFT", "PENDING", "COMPLETED"),
        defaultValue: "DRAFT",
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
    await queryInterface.dropTable("purchase_requests");
  },
};
