// import app from './app';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    console.log('USE COOKIE', req.cookies);
    req['parsedCookies'] = req.cookies;
    next();
});

app.use((req, res, next) => {
    console.log('USE QUERY', req.cookies);
    req['parsedQuery'] = req.query;
    next();
});

app.post('/', (req, res) => {
    console.log('POST: parsedCookies', req.parsedCookies);
    console.log('POST: parsedQuery', req.parsedQuery);
    res.send();
});