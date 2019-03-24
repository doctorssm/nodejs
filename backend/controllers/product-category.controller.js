const ProductCategory = require('../models/product-category.model');

module.exports.get = (req, res) => {
  ProductCategory.find((err, categories) => {
    if (err) {
      throw err;
    }

    res.json(categories);
  });
};

module.exports.create = (req, res) => {
  const productCategory = new ProductCategory({
    categoryId: new Date().getTime(), // temp solution
    parentCategoryId: req.body.parentCategoryId,
    name: req.body.name,
    status: req.body.status,
    children: req.body.children
  });

  ProductCategory.create(productCategory, (err, result) => {
    if (err) {
      throw err;
    }

    res.send(result);
  });
};

module.exports.updateOne = (req, res) => {
  ProductCategory.updateOne({ categoryId: req.params.id }, req.body, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Product category ${req.params.id} has been successfully updated`
    });
  });
};

module.exports.deleteOne = (req, res) => {
  ProductCategory.deleteOne({ categoryId: req.params.id }, (err) => {
    if (err) {
      throw err;
    }

    res.json({
      message: `Product category ${req.params.id} has been successfully deleted`
    });
  });
};
