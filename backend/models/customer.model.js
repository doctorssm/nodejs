const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  customerId: Number,
  name: String,
  phone: String,
  email: String,
  comment: String
});

module.exports = mongoose.model('Customer', CustomerSchema);
