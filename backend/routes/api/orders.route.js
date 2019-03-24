const express = require('express');
const router = express.Router();
const checkToken = require('../../helpers/helper').checkToken;
const orderController = require('../../controllers/order.controller');

router.get('/api/orders', checkToken, orderController.get);
router.post('/api/orders', checkToken, orderController.create);
router.put('/api/orders/:ids', checkToken, orderController.updateMany);
router.delete('/api/orders/:ids', checkToken, orderController.deleteMany);

module.exports = router;
