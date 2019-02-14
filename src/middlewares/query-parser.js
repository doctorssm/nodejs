const parser = require('../helpers/parser');

function queryParser(req, res, next) {
    const url = req.url;
    const queryStartIndex = url.indexOf('?');

    if (!queryStartIndex) {
        next();
    }

    const queryStr = url.slice(queryStartIndex + 1);
    const queryArray = queryStr.split('&');

    req.parsedQuery = parser(queryArray, '=');

    next();
}

module.exports = () => queryParser;