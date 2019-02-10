// import app from './app';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;

const productRouter = require('./routes/products');
const userRouter = require('./routes/users');

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    req['parsedCookies'] = req.cookies;
    next();
});

app.use((req, res, next) => {
    req['parsedQuery'] = req.query;
    next();
});

app.use(productRouter);

app.use(userRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
