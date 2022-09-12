const jwt = require('jsonwebtoken');
const tokenStore = require('../stores/jwtStore');
const { success } = require('../utils/response');

require('dotenv').config({ path: '../config' });

const postLogin = async (req, res) => {
    const token = await jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY,
        {
            expiresIn: '30m',
        },
    );
    tokenStore.removeByEmail(req.body.email);
    const refreshToken = await jwt.sign(
        { email: req.body.email },
        process.env.REFRESH_SECRET_KEY,
        {
            expiresIn: '7d',
        },
    );
    tokenStore.push(refreshToken);
    res.status(201).send(success({
        token,
        expire: 1800,
        refreshToken,
    }));
};

module.exports = postLogin;
