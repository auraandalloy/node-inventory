'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('alloy_Categories', [
      {
        name: 'Occasions & Themes',
        description: 'Categories related to specific events, holidays, and thematic designs.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Details & Styles',
        description: 'Categories describing design aesthetics, visual details, and overall style.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Product Types',
        description: 'Categories defining the physical classification of the item.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Materials',
        description: 'Categories defining the raw materials used to create the product.',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alloy_Categories', {
      name: {
        [Sequelize.Op.in]: ['Occasions & Themes', 'Details & Styles', 'Product Types', 'Materials']
      }
    }, {});
  }
};