const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { success } = require('../utils/response');
const tokenStore = require('../stores/jwtStore');

const postSignin = (req, res, next) => {
    User.create({
        uid: uuid.v4(),
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
    }).then(async () => {
        const token = await jwt.sign(
            { email: req.body.email },
            process.env.SECRET_KEY,
            {
                expiresIn: '30m',
            },
        );
        const refreshToken = await jwt.sign(
            { email: req.body.email },
            process.env.REFRESH_SECRET_KEY,
            {
                expiresIn: '7d',
            },
        );
        tokenStore.push(refreshToken);
        res.status(200).send(success({
            token,
            expire: 1800,
            refreshToken,
        }));
    }).catch((err) => {
        next(err);
    });
};

module.exports = postSignin;
