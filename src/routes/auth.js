const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth.controller');
const passport = require('./../config/passport');
const jwt = require('jsonwebtoken');
const config = require('./../config/config.json');

// router.post('/api/auth', passport.authenticate('local'), authController.login);
router.post("/api/auth", passport.authenticate('local', { session: false }), (req, res, next) => {
// res.json(req.user);
const token = jwt.sign({
  sub: req.user.userId,
  userName: req.user.userName
}, config.secret, {
  expiresIn: '2 hours'
});

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
    token
  });

});

module.exports = router;
