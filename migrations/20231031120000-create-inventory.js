'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alloy_Inventory', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      date: {
        // Consider using Sequelize.DATE if this field stores an actual Date
        type: Sequelize.DATE 
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      physicalLocation: {
        type: Sequelize.ENUM('Tiny', 'Verde', 'Else')
      },
      isExported: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isSold: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      isShipped: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alloy_Inventory');
  }
};