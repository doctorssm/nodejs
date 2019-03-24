const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
  categoryId: Number,
  parentCategoryId: Number,
  name: String,
  status: Number,
  children: [{ // TODO: replace to productCategorySchema
    categoryId: Number,
    parentCategoryId: Number,
    name: String,
    status: Number,
  }]
});

module.exports = mongoose.model('ProductCategory', productCategorySchema);
