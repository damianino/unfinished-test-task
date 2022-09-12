const { BaseError } = require('sequelize');
const ApiError = require('../utils/error');
const { error, fail } = require('../utils/response');

const apiErrorHandler = (err, req, res, next) => {
  if (err instanceof BaseError) {
    const errors = {};
    err.errors.forEach((e) => {
      errors[e.path] = e.message;
    });
    res.status(400).send(fail(errors));
    return;
  }
  if (err instanceof ApiError) {
    res.status(err.code).send(fail(err.message));
    return;
  }
  console.log(err);
  res.status(500).send(error('something went wrong'));
  next();
};

module.exports = apiErrorHandler;
