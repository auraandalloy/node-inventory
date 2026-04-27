'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // A Category can have many Tags
      Category.hasMany(models.Tag, {
        foreignKey: 'categoryId',
        as: 'tags'
      });
    }
  }
  
  Category.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Category',
    tableName: 'alloy_Categories'
  });
  
  return Category;
};