'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const timestamp = new Date();

    const tags = [
      // Occasions & Themes (categoryId = 1)
      ...[
        'Wedding', 'Bridal Party', 'Bachelorette', 'Bridesmaid Gift', 'Ritual', 
        'Modern Nostalgia', 'Cosmic', 'Earthy', 'Gift Ready', 'Bespoke', 
        'Custom Initial', 'Artisan Made'
      ].map(name => ({ name, categoryId: 1, createdAt: timestamp, updatedAt: timestamp })),

      // Details & Styles (categoryId = 2)
      ...[
        'Patina Blue', 'Hand-Etched', 'Celestial', 'Zodiac', 'Moon', 'Moravian Star', 
        'Wabi-Sabi', 'Minimalist', 'Statement', 'Raw Texture', 'Geometric', 
        'Organic Shape', 'Lightweight', 'Tarnish Resistant'
      ].map(name => ({ name, categoryId: 2, createdAt: timestamp, updatedAt: timestamp })),

      // Product Types (categoryId = 3)
      ...[
        'Bracelet', 'Earring', 'Hairpiece', 'Necklace', 'Ring', 'Cuff', 'Pendant', 
        'Anklet', 'Mirror', 'Wall Hanging', 'Tapestry', 'Scroll', 'Home Decor', 
        'Jewelry Set', 'Accessory'
      ].map(name => ({ name, categoryId: 3, createdAt: timestamp, updatedAt: timestamp })),

      // Materials (categoryId = 4)
      ...[
        'Copper', 'Aluminum', 'Recycled Metal', 'Raw Copper', 'Genuine Leather', 
        'Washed Linen', 'Patina Finish', 'Brass', 'Sterling Silver', 'Gemstone', 
        'Wood', 'Fabric', 'Beads', 'Mixed Metals', 'Semi-Precious'
      ].map(name => ({ name, categoryId: 4, createdAt: timestamp, updatedAt: timestamp }))
    ];

    await queryInterface.bulkInsert('alloy_Tags', tags, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('alloy_Tags', {
      categoryId: {
        [Sequelize.Op.in]: [1, 2, 3, 4]
      }
    }, {});
  }
};