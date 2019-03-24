const express = require('express');
const router = express.Router();
const checkToken = require('./../middlewares/check-token');
const productController = require('./../controllers/product.controller');

router.get('/api/products', checkToken, productController.getProducts);
router.get('/api/products/:id', checkToken, productController.getProductById);
router.get('/api/products/:id/reviews', checkToken, productController.getProductReviews);
router.post('/api/products', checkToken, productController.addProduct);

module.exports = router;
