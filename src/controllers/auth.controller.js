const users = require('./../data/users');
const jwt = require('jsonwebtoken');
const config = require('./../config/config.json');

module.exports.login = (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  if (!userName || !password) {
    res
      .status(400)
      .json({
        success: false,
        message: 'Incorrect username or password'
      });
  }

  const user = users.find((user) =>
    user.userName === userName &&
    user.password === password
  );

  if (!user) {
    res
      .status(401)
      .json({
        success: false,
        message: 'Authentication failed! User not found'
      })
  }

  const token = jwt.sign({
    sub: user.userId,
    userName: user.userName
  }, config.secret, {
    expiresIn: '2 hours'
  });

  res
    .json({
      code: 200,
      message: 'OK',
      data: {
        user: {
          email: user.email,
          username: user.userName
        }
      },
      token
    });
};
