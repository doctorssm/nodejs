const expressJwt = require('express-jwt');
const config = require('../config/config');
const helper = require('./helper');

module.exports.checkToken = expressJwt({
  secret: config.TOKEN_SECRET
});

module.exports.mapToNumbers = (str, separator) => {
  separator = separator || ',';

  if (!str) {
    return [];
  }

  return str.split(separator).map((item) => parseInt(item, 10));
};

module.exports.toSchemaConditions = (query) => {
  return Object.entries(query).reduce((result, [key, value]) => {
    console.log(typeof value);

    if (Number.isInteger(parseInt(value))) {
      console.log('PPP');
      result[key] = { $in: helper.mapToNumbers(value) };
    } else {
      result[key] = new RegExp(value, 'i');
    }

    return result;
  }, {});
};
