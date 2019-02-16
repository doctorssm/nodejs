const parser = require('../helpers/parser');

function cookieParser(req, res, next) {
    const cookiesStr = req.headers.cookie;

    if (!cookiesStr) {
        next();
    }

    const cookiesArray = cookiesStr.split(';');
    req.parsedCookies = parser(cookiesArray, '=');

    next();
}

module.exports = () => cookieParser;