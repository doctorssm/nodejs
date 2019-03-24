const Product = require('../models/product.model');
const helper = require('../helpers/helper');
const _isEmpty = require('lodash').isEmpty;

module.exports.get = (req, res) => {
  console.log('PRODUCT', req.query);

  const callback = (err, orders) => {
    if (err) {
      throw err;
    }
    res.json(orders);
  };

  if (_isEmpty(req.query)) {
    Product.find(callback);
  } else {
    Product.find(toFilterConditions(req.query), callback);
  }
};

module.exports.getByIds = (req, res) => {
  Product.find({ productId: { $in: helper.mapToNumbers(req.params.ids) } }, (err, products) => {
    if (err) {
      throw err;
    }

    res.json(products);
  });
};

module.exports.create = (req, res) => {
  const product = new Product({
    productId: new Date().getTime(), // temp solution
    categoryId: req.body.categoryId,
    name: req.body.name,
    code: req.body.code,
    price: req.body.price,
    purchasePrice: req.body.purchasePrice,
    description: req.body.description,
    images: req.body.images,
    quantity: req.body.quantity,
    status: req.body.status,
    producer: req.body.producer,
    measurement: req.body.measurement,
    weight: req.body.weight
  });

  Product.create(product, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
  });
};

module.exports.updateMany = (req, res) => {
  Product.updateMany({ productId: { $in: helper.mapToNumbers(req.params.ids) } }, { $set: req.body }, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Products ${req.params.ids} have been successfully updated`
    });
  });
};

module.exports.deleteMany = (req, res) => {
  Product.deleteMany({ productId: { $in: helper.mapToNumbers(req.params.ids) } }, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Products ${req.params.ids} have been successfully deleted`
    });
  });
};

function toFilterConditions(query) {
  return Object.entries(query).reduce((result, [key, value]) => {
    switch (key) {
      case 'name':
        result[key] = new RegExp(value, 'i');
        break;
      default:
        console.log('DEF', value);
    }

    console.log('RES', result);

    return result;
  }, {});
}
