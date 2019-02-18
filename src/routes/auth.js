const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth.controller');
const passport = require('./../config/passport');
const jwt = require('jsonwebtoken');
const config = require('./../config/config.json');

// router.post('/auth', passport.authenticate('local'), authController.login);
router.post("/auth", passport.authenticate('local', { session: false }), (req, res, next) => {

res
  .json({
    code: 200,
    message: 'OK',
    data: {
      user: {
        email: req.user.email,
        username: req.user.userName
      }
    },
    token: getToken(req.user)
  });

});

router.get("/auth/facebook/callback", passport.authenticate('facebook', { session: false }), (req, res, next) => {
  res
    .json({
      code: 200,
      message: 'OK'
    })

  });

module.exports = router;

function getJwtToken(user) {
  return jwt.sign({
    sub: user.userId,
    userName: user.userName
  }, config.secret, {
    expiresIn: '2 hours'
  });
}
