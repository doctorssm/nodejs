const express = require('express');
const app = express();
const cookieParser = require('./middlewares/cookie-parser');
const queryParser = require('./middlewares/query-parser');
const productRouter = require('./routes/products');
const userRouter = require('./routes/users');

const port = process.env.PORT || 8080;

app.use(express.json());

app.use(cookieParser());
app.use(queryParser());

app.use(productRouter);
app.use(userRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`));
