'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      // Define the many-to-many association with Inventory
      Tag.belongsToMany(models.Inventory, {
        through: 'alloy_InventoryTags',
        foreignKey: 'tagId',
        otherKey: 'inventoryId',
        as: 'inventories'
      });

      // Define the one-to-many association with Category
      Tag.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
  }
  
  Tag.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tag',
    tableName: 'alloy_Tags'
  });
  return Tag;
};