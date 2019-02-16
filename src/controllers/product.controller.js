const products = require('./../data/products');

module.exports.getProducts = (req, res) => {
    res.json(products);
};

module.exports.getProductById = (req, res) => {
    const product = products.find((product) => product.productId === parseInt(req.params.id));

    if (!product) {
        // res.statusCode = 404;
        throw 'Product not found';
    }

    res.json(product);
};

module.exports.getProductReviews = (req, res) => {
    const product = products.find((product) => product.productId === parseInt(req.params.id));

    if (!product) {
        // res.statusCode = 404;
        throw 'Product not found';
    }

    res.json(product.reviews);
}

module.exports.addProduct = (req, res) => {
    const product = {
        productId: new Date().getTime(),
        name: req.body.name,
        price: req.body.price,
        producer: req.body.producer,
        reviews: req.body.reviews || 0
    };

    products.push(req.body);

    res.json(product);
}