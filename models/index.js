// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Product and Category have a one to many relationship which means that one product can belong to one category, but categories can have multiple products. 
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  // If we delete a category, then because one product has to belong to a category, then the product is also deleted. 
  onDelete: 'CASCADE',
})

// This is the many component of the one-to-many relationship between Cateogry and Product.
Category.hasMany(Product, {
  foreignKey: 'category_id',
})

// Product and Tag have a many-to-many relationship which uses a through model called ProductTag, which is defined in the model/ProductTag.js file. 
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
})

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
})

// Export the defined relationships for use in other files. 
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
