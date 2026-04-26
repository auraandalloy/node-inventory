'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Inventory.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    image_url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    tags: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('tags');
        // Ensure we always return an array, even for null/empty values.
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue('tags', JSON.stringify(value || []));
      }
    },
    date: DataTypes.DATE,
    price: DataTypes.DECIMAL(10, 2),
    quantity: DataTypes.INTEGER,
    physicalLocation: DataTypes.ENUM('Tiny', 'Verde', 'Else'),
    isExported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isSold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isShipped: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Inventory',
    tableName: 'alloy_Inventory' // Ensures hook generates 'alloy_Inventory' instead of 'alloy_Inventories'
  });
  return Inventory;
};