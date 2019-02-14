function cookieParser(req, res, next) {
    const cookiesStr = req.headers.cookie;

    if (!cookiesStr) {
        next();
    }

    const cookiesArray = cookiesStr.split(';');
    req.cookies = getCookies(cookiesArray);

    next();
}

function getCookies(array) {
    return array.reduce((acc, value) => {
        const dictionary = value.trim().split('=');
        acc[dictionary[0]] = dictionary[1];

        return acc
    }, {});
}

module.exports = () => cookieParser;