'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hash the password securely before inserting it into the database
    const hashedPasswordAbby = bcrypt.hashSync('YOuaskedforlongpasswordmrsrobbinson1!', 10);
    const hashedPasswordOthers = bcrypt.hashSync('MOanamickey1!', 10);

    // Insert the initial users into the 'alloy_Users' table
    // Note: Pass all objects inside a single array
    return queryInterface.bulkInsert('alloy_Users', [
      {
        username: 'abby@auraandalloystudio.com',
        password: hashedPasswordAbby,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'verde@auraandalloystudio.com',
        password: hashedPasswordOthers,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'tiny@auraandalloystudio.com',
        password: hashedPasswordOthers,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Use Sequelize.Op.like to perform a SQL LIKE query and remove the users
    return queryInterface.bulkDelete('alloy_Users', { 
      username: { [Sequelize.Op.like]: '%@auraandalloystudio.com' } 
    }, {});
  }
};
