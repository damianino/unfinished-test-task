const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const ApiError = require('../utils/error');

const authenticate = async (req, res, next) => {
    if (req.body.email == null || req.body.email === ''
        || req.body.password == null || req.body.password === '') {
        next(ApiError.badRequest('plaease provide email and password'));
        return;
    }
    User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user === null) {
            next(ApiError.badRequest('user with this email not found'));
            return;
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            next(ApiError.badRequest('wrong email or password'));
            return;
        }
        next();
    }).catch(() => {
        next(ApiError.internal());
    });
};

module.exports.authenticate = authenticate;
