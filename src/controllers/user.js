const { User } = require('../models/user');
const { Tag } = require('../models/tag');
const ApiError = require('../utils/error');
const { success } = require('../utils/response');
const tokenStore = require('../stores/jwtStore');

const getUser = async (req, res, next) => {
    const { email } = req.payload;
    const data = {};
    let user;
    try {
        user = await User.findOne({ where: { email } });
    } catch (err) {
        console.log(err);
        next(ApiError.internal());
        return;
    }
    if (user == null) {
        next(ApiError.internal());
        return;
    }
    data.email = email;
    data.nickname = user.nickname;
    let tags;
    try {
        tags = await Tag.findAll({ where: { creator: user.uid } });
    } catch (err) {
        console.log(err);
        next(ApiError.internal());
        return;
    }
    const tagsResponse = tags.map((tag) => {
        const { id, name, sort_order } = tag;
        return { id, name, sort_order };
    });
    data.tags = tagsResponse;
    res.send(success(data));
};

const putUser = async (req, res, next) => {
    const { email, nickname, password } = req.body;
    try {
        await User.update({
            ...(email && { email }),
            ...(nickname && { nickname }),
            ...(password && { password })
        }, { where: { email: req.payload.email } });
    } catch (err) {
        console.log(err);
        next(ApiError.internal());
        return;
    }
    let user;
    try {
        user = await User.findOne({ where: { email: req.payload.email } });
    } catch (err) {
        next(ApiError.internal());
        return;
    }
    res.status(200).send(success({ email: user.email, nickname: user.nickname }));
};

const deleteUser = async (req, res, next) => {
    try {
        await User.destroy({ where: { email: req.payload.email } });
    } catch (err) {
        console.log(err);
        next(ApiError.internal());
        return;
    }
    tokenStore.removeByEmail(req.payload.email);
    tokenStore.invalidateAccessToken(req.token);
    res.send(success());
};

module.exports = { getUser, putUser, deleteUser };
