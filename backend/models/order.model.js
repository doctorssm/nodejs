const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    orderId: String,
    status: Number,
    customer: {
      customerId: Number,
      name: String,
      phone: String,
      email: String
    },
    payment: Number,
    delivery: {
      company: Number,
      address: String,
      ttn: Number
    },
    products: [Number],
    comment: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
