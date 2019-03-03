const express = require('express');
const router = express.Router();
const checkToken = require('../../helpers/helper').checkToken;
const userController = require('../../controllers/user.controller');

router.get('/api/users', checkToken, userController.get);
router.post('/api/users', checkToken, userController.create);
router.put('/api/users/:id', checkToken, userController.updateOne);
router.delete('/api/users/:ids', checkToken, userController.deleteMany);

module.exports = router;
