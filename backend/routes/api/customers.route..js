const express = require('express');
const router = express.Router();
const checkToken = require('../../helpers/helper').checkToken;
const customerController = require('../../controllers/customer.controller');

router.get('/api/customers', checkToken, customerController.get);
router.post('/api/customers', checkToken, customerController.create);
router.put('/api/customers/:id', checkToken, customerController.updateOne);
router.delete('/api/customers/:ids', checkToken, customerController.deleteMany);

module.exports = router;
