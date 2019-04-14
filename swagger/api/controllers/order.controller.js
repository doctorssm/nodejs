const Order = require('../../../backend/models/order.model');
const helper = require('../../../backend/helpers/helper');
const _isEmpty = require('lodash').isEmpty;

module.exports.get = (req, res) => {
  console.log(req.query);

  const callback = (err, orders) => {
    if (err) {
      throw err;
    }
    res.json(orders);
  };

  if (_isEmpty(req.query)) {
    Order.find(callback);
  } else {
    Order.find(toFilterConditions(req.query), callback);
  }
};

module.exports.create = (req, res) => {
  const order = new Order({
    orderId: new Date().getTime(), // temp solution
    status: req.body.status,
    customer: req.body.customer,
    payment: req.body.payment,
    delivery: req.body.delivery,
    products: req.body.products,
    comment: req.body.comment
  });

  Order.create(order, (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result);
  });
};

module.exports.updateMany = (req, res) => {
  Order.updateMany({ orderId: { $in: helper.mapToNumbers(req.params.ids) } }, { $set: req.body }, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Orders ${req.params.ids} have been successfully updated`
    });
  });
};

module.exports.deleteMany = (req, res) => {
  Order.deleteMany({ orderId: { $in: helper.mapToNumbers(req.params.ids) } }, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Orders ${req.params.ids} have been successfully deleted`
    });
  });
};

function toFilterConditions(query) {
  return Object.entries(query).reduce((result, [key, value]) => {
    switch (key) {
      case 'orderId':
      case 'customer.name':
      case 'customer.phone':
      case 'delivery.address':
      case 'comment':
        result[key] = new RegExp(value, 'i');
        break;
      case 'status':
      case 'payment':
      case 'delivery.company':
        result[key] = value;
        break;
      case 'createdAt':
      case 'updatedAt':
        console.dir(value);
        const range = JSON.parse(value);
        result[key] = {
          $gte: range.start,
          $lte: range.end
        };
        break;
      default:
        console.log('DEF', value);
    }

    console.log('RES', result);

    return result;
  }, {});
}
