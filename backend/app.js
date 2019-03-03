const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const ordersRoute = require('./routes/api/orders.route');
const productsRoute = require('./routes/api/products.route');
const productCategoriesRoute = require('./routes/api/product-categories.route');
const customersRoute = require('./routes/api/customers.route.');
const usersRoute = require('./routes/api/users.route');
const authRoute = require('./routes/auth.route');
const setup = require('./routes/api/setup');

// include configuration
const config = require('./config/config');

// initialize application
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// force https in production
// if (app.get('env') === 'production') {
//   app.use(function (req, res, next) {
//     var protocol = req.get('x-forwarded-proto');
//     protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
//   });
// }

// connect to MongoDB
mongoose
  .connect(config.MONGO_URI)
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Connection to database failed'));

// load routes
app.use(authRoute);
app.use(productCategoriesRoute);
// TODO: if put products route before productCategories route - will be conflict in method getByIds.
// look likes it takes path from prodcut-categories 'api/products/categories' instead of 'api/products/:ids
// understand why it is happenning and fix/ METHOD GET/ Look mentoring video nodejs
// add product routes
app.use(productsRoute);
app.use(ordersRoute);
app.use(customersRoute);
app.use(usersRoute);
app.use(setup); // temp route to setup orders to db

// start server
app.listen(config.LISTEN_PORT, () => {
  console.log(`Express server listening on port ${config.LISTEN_PORT}`);
});
