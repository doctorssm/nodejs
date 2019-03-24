const express = require('express');
const router = express.Router();
const checkToken = require('./../middlewares/check-token');
const userController = require('./../controllers/user.controller');

router.get('/api/users', checkToken, userController.getUsers);

module.exports = router;
