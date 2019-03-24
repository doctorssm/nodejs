const express = require('express');
const router = express.Router();
const Order = require('../../models/order.model');
const Product = require('../../models/product.model');

router.get('/api/setup-orders', (req, res) => {
  let orders = [
    {
      orderId: Math.round(Math.random() * 100000).toString(),
      status: 2,
      customer: {
        customerId: 1,
        name: 'Джон До',
        phone: '(050)1234567',
        email: 'john.doe@example.com'
      },
      payment: 0,
      delivery: {
        address: 'г. Киев, склад 1',
        ttn: 2254345744125
      },
      products: [44820],
      comment: 'New comment'
    },
    {
      orderId: Math.round(Math.random() * 100000).toString(),
      status: 2,
      customer: {
        customerId: 2,
        name: 'Марк Цукерберг',
        phone: '(050)4568547',
        email: 'mark@example.com'
      },
      payment: 0,
      delivery: {
        address: 'г. Винница, склад 10',
        ttn: 2254345744125
      },
      products: [1546621723851, 1546621723851],
      comment: null
    },
    {
      orderId: Math.round(Math.random() * 100000).toString(),
      status: 2,
      customer: {
        customerId: 3,
        name: 'Илон Маск',
        phone: '(093)4582155',
        email: 'space.x@example.com'
      },
      payment: 0,
      delivery: {
        address: 'г. Сумы, склад 3',
        ttn: 2254345744125
      },
      products: [1546621723852, 1546621723851],
      comment: null
    }
  ];

  Order.create(orders, function(err, result) {
    res.send(result);
  });
});

router.get('/api/setup-products', (req, res) => {
  let products = [
    {
      productId: new Date().getTime(),
      name: 'Product 1',
      price: 199,
      purchasePrice: 100,
      images: ['http://www.eclipse-lingerie.com.ua/_sh/83/8311.jpg'],
      status: 0,
      measurement: {
        width: 100,
        height: 50,
        depth: 30
      },
      code: 'LC2534-1',
      producer: 'China',
      quantity: 12,
      weight: 0.2
    },
    {
      productId: new Date().getTime() + 2,
      name: 'Product 2',
      price: 299,
      purchasePrice: 100,
      images: ['http://www.eclipse-lingerie.com.ua/_sh/83/8304.jpg'],
      status: 1,
      measurement: {
        width: 150,
        height: 120
      },
      code: 'LC2534-2',
      producer: 'China',
      quantity: 5
    },
    {
      productId: new Date().getTime() + 3,
      name: 'Product 3',
      price: 399,
      purchasePrice: 100,
      images: ['http://www.eclipse-lingerie.com.ua/_sh/82/8291.jpg'],
      status: 2,
      measurement: {
        width: 150
      },
      code: 'LC2534-3',
      producer: 'UK',
      quantity: 7
    },
    {
      productId: new Date().getTime() + 4,
      name: 'Product 4',
      price: 499,
      purchasePrice: 100,
      images: ['http://www.eclipse-lingerie.com.ua/_sh/82/8299.jpg'],
      status: 3,
      measurement: {
        width: 150
      },
      code: 'LC3578',
      producer: 'Ukraine',
      quantity: 2
    }
  ];

  Product.create(products, function(err, result) {
    res.send(result);
  });
});

module.exports = router;
