const jwt = require('jsonwebtoken');
const tokenStore = require('../stores/jwtStore');
const ApiError = require('../utils/error');

const jwtAuth = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[2];
  req.token = token;
  if (token == null || token === '') {
    next(ApiError.unauthorized('access token not provided'));
    return;
  }
  if (tokenStore.accessTockenBlacklist.includes(token)) {
    next(ApiError.unauthorized('invalid access token'));
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    req.payload = payload;
    next();
  } catch (error) {
    next(ApiError.unauthorized('invalid access token'));
  }
};

module.exports = jwtAuth;
