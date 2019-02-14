const users = require('./../data/users');

module.exports.getUsers = (req, res) => {
    res.json(users);
}