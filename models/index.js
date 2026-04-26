'use strict';

const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

// Explicitly require tedious so Netlify's bundler includes it for the mssql dialect
require('tedious');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env]; // Use a direct, static path


const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // The 'config' object here is what passes your dialect ("mssql") to Sequelize
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}



// SERVERLESS FIX: Netlify's bundler cannot statically analyze fs.readdirSync() 
// or dynamic requires. You must require each model manually below.
// Make sure the string matches your actual model file name exactly:
const Inventory = require('./inventory.js')(sequelize, Sequelize.DataTypes);
db[Inventory.name] = Inventory;

// If you have other models, add them manually as well:
// const User = require('./user.js')(sequelize, Sequelize.DataTypes);
// db[User.name] = User;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
