// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      // The decimal data type ensures that the value can have 10 total digits and 2 digits reserved for decimal places to the right of a period. 
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      // validated whether the price value is consistent with the requirements of being a decimal data type. 
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // sets the default value of stock to 10
      defaultValue: 10,
      // ensures that whatever value exists in stock is numeric.
      validate: {
        isNumeric: true,
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      // tells the database that category_id references category model and its variable id
      references: {
        model: 'category',
        key: 'id',
      }
    }
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
