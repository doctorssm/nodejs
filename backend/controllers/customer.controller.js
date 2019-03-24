const Customer = require('../models/customer.model');
const helper = require('../helpers/helper');

module.exports.get = (req, res) => {
  Customer.find((err, customers) => {
    if (err) {
      throw err;
    }

    res.json(customers);
  });
};

module.exports.create = (req, res) => {
  const customer = new Customer({
    customerId: new Date().getTime(), // temp solution
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    comment: req.body.comment
  });

  Customer.create(customer, (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result);
  });
};

module.exports.updateOne = (req, res) => {
  Customer.updateOne({ customerId: req.params.id }, req.body, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Customer ${req.params.id} has been successfully updated`
    });
  });
};

module.exports.deleteMany = (req, res) => {
  Customer.deleteMany({ customerId: { $in: helper.mapToNumbers(req.params.ids) } }, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Customers ${req.params.ids} have been successfully deleted`
    });
  });
};
