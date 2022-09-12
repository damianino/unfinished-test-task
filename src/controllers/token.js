const jwt = require('jsonwebtoken');
const tokenStore = require('../stores/jwtStore');
const ApiError = require('../utils/error');
const { success } = require('../utils/response');

const postToken = async (req, res, next) => {
    try {
        if (!tokenStore.refreshTokens.includes(req.body.refreshToken)) {
            next(ApiError.unauthorized('refresh token not registered'));
            return;
        }

        const user = jwt.verify(
            req.body.refreshToken,
            process.env.REFRESH_SECRET_KEY,
        );
        if (user.email !== req.payload.email) {
            next(ApiError.unauthorized('tokens dont match'));
        }

        tokenStore.remove(req.body.refreshToken);

        const token = await jwt.sign(
            { email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '30m' },
        );
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
    } catch (error) {
        next(ApiError.unauthorized('invalid refresh token'));
    }
};

module.exports = postToken;
