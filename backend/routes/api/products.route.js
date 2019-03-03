const express = require('express');
const router = express.Router();
const checkToken = require('../../helpers/helper').checkToken;
const productController = require('../../controllers/product.controller');

router.get('/api/products', checkToken, productController.get);
router.get('/api/products/:ids', checkToken, productController.getByIds);
router.post('/api/products', checkToken, productController.create);
router.put('/api/products/:ids', checkToken, productController.updateMany);
router.delete('/api/products/:ids', checkToken, productController.deleteMany);

module.exports = router;
