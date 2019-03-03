const express = require('express');
const router = express.Router();
const checkToken = require('../../helpers/helper').checkToken;
const categoryController = require('../../controllers/product-category.controller');

router.get('/api/products/categories', checkToken, categoryController.get);
router.post('/api/products/categories', checkToken, categoryController.create);
router.put('/api/products/categories/:id', checkToken, categoryController.updateOne);
router.delete('/api/products/categories/:id', checkToken, categoryController.deleteOne);

module.exports = router;
