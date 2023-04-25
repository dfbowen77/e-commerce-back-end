const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

// By extending the sequelize Model it allows us to call the init method, which follows an object oriented programming pattern.  
class Category extends Model {}

Category.init(
  {
    id: {
      // the type of data for the id is an integer
      type: DataTypes.INTEGER,
      // the id field cannot be null
      allowNull: false,
      // the id is the primarykey; it is a value that is unique to each row in the table.
      primaryKey: true,
      // the id field automatically increments by one integer. 
      autoIncrement: true,
    },
    category_name: {
      // defined the category variable as a string, which means that it is sequence of characters that represent the category_name. 
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
