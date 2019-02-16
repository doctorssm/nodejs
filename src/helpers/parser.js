function parser(array, sign) {
    return array.reduce((acc, value) => {
        const dictionary = value.trim().split(sign);
        acc[dictionary[0]] = dictionary[1];

        return acc
    }, {});
}

module.exports = (array, sign) => parser(array, sign);