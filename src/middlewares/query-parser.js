function queryParser(req, res, next) {
    const url = req.url;
    const queryStartIndex = url.indexOf('?');

    if (!queryStartIndex) {
        next();
    }

    const queryStr = url.slice(queryStartIndex + 1);
    const queryArray = queryStr.split('&');

    req.parsedQuery = getUrlQuery(queryArray);

    next();
}

function getUrlQuery(array) {
    return array.reduce((acc, value) => {
        const dictionary = value.trim().split('=');
        acc[dictionary[0]] = dictionary[1];

        return acc
    }, {});
}

module.exports = () => queryParser;