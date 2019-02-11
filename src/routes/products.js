const express = require("express");
const router = express.Router();
const products = require("./../data/products");

router.get("/api/products", (req, res) => {
  res.json(products);
});

router.get("/api/products/:id", (req, res) => {
  const product = products.find(
    product => product.productId === parseInt(req.params.id)
  );

  if (!product) {
    res
      .status(404)
      .json({ message: `Product with id ${req.params.id} not found` });
  }

  res.json(product);
});

router.get("/api/products/:id/reviews", (req, res) => {
  const product = products.find(
    product => product.productId === parseInt(req.params.id)
  );

  if (!product) {
    res
      .status(404)
      .json({ message: `Product with id ${req.params.id} not found` });
  }

  res.json(product.reviews);
});

router.post("/api/products", (req, res) => {
  const product = {
    productId: new Date().getTime(),
    name: req.body.name,
    price: req.body.price,
    producer: req.body.producer,
    reviews: req.body.reviews || 0
  };

  products.push(req.body);

  res.json(product);
});

module.exports = router;
