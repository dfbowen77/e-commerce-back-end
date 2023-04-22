// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
})

Category.hasMany(Product, {
  foreignKey: 'category_id',
  OnDelete: 'CASCADE',
})

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  // The alias below has to be unique (i.e. I can't name it the same alias that I named the Tag.belongsToMany(Product) because that will lead to a sequelize error due to it not knowing which alias belongs to which association. 
  as: 'products_tags'
})

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tags_products'
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
