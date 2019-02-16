const express = require('express');
const router = express.Router();
const productController = require('./../controllers/product.controller');

router.get('/api/products', productController.getProducts);
router.get('/api/products/:id', productController.getProductById);
router.get('/api/products/:id/reviews', productController.getProductReviews);
router.post('/api/products', productController.addProduct);

module.exports = router;
