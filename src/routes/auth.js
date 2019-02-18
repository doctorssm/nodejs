const express = require('express');
const router = express.Router();
const authController = require('./../controllers/auth.controller');
const passport = require('./../config/passport');

// router.post('/api/auth', passport.authenticate('local'), authController.login);
router.post("/api/auth", passport.authenticate('local', { session: false }), (req, res, next) => {
res.json(req.user);
});

module.exports = router;
