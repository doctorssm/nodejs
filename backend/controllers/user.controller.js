const User = require('../models/user.model');
const helper = require('../helpers/helper');

module.exports.get = (req, res) => {
  User.find((err, users) => {
    if (err) {
      throw err;
    }

    res.json(users);
  });
};

module.exports.create = (req, res) => {
  const user = new User({
    userId: new Date().getTime(), // temp solution;
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    photo: req.body.photo,
    group: req.body.group,
    email: req.body.email,
    comment: req.body.token
  });

  User.create(user, (err, result) => {
    if (err) {
      throw err;
    }

    res.json(result);
  });
};

module.exports.updateOne = (req, res) => {
  User.updateOne({ userId: req.params.id }, req.body, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `User ${req.params.id} has been successfully updated`
    });
  });
};

module.exports.deleteMany = (req, res) => {
  User.deleteMany({ userId: { $in: helper.mapToNumbers(req.params.ids) } }, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Users ${req.params.ids} have been successfully deleted`
    });
  });
};
