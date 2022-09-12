const tokenStore = require('../stores/jwtStore');
const { success } = require('../utils/response');

const postLogout = (req, res) => {
    tokenStore.removeByEmail(req.payload.email);
    res.status(200).send(success());
};

module.exports = postLogout;
