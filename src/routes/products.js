const express = require('express');
const router = express.Router();

router.get('/api/products', (req, res) => {
    console.log('/api/products');
    res.json({ productId: 10 });
});

router.get('/api/products/:id', (req, res) => {
    res.json();
});

router.get('/api/products/:id/reviews', (req, res) => {
    res.json();
});

router.post('/api/products', (req, res) => {
    res.json();
});

module.exports = router;