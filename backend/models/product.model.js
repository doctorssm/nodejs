const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: Number,
  categoryId: Number,
  name: String,
  code: String,
  price: Number,
  purchasePrice: Number,
  description: String,
  images: [String],
  quantity: Number,
  status: Number,
  producer: String,
  measurement: {
    width: Number,
    height: Number,
    depth: Number
  },
  weight: Number
});

module.exports = mongoose.model('Product', productSchema);
