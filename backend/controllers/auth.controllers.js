const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user.model');

module.exports.login = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    res.status(400).json({
      message: 'Incorrect username or password'
    });
  }

  // https://stackoverflow.com/questions/12096262/how-to-protect-the-password-field-in-mongoose-mongodb-so-it-wont-return-in-a-qu
  User.findOne({ userName }, '+password', (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      res.status(401).json({
        message: 'Authentication failed! User not found'
      });
    } else {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          throw err;
        }

        if (isMatch) {
          const token = jwt.sign({ sub: user.userId, userName: user.userName }, config.TOKEN_SECRET, {
            expiresIn: '2 hours'
          });

          res.status(200).json({
            userId: user.userId,
            token
          });
        } else {
          res.status(400).json({
            message: 'Incorrect username or password'
          });
        }
      });
    }
  });
};

module.exports.signup = (req, res) => {
  console.log('signup');
};
