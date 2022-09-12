// const res = require("express/lib/response");

const success = (data = {}, meta = null) => {
    const response = {
        status: 'success',
        data,
        ...(meta && { meta }),
    };
    return JSON.stringify(response);
};

const fail = (data = {}, meta = null) => {
    const response = {
        status: 'fail',
        data,
        ...(meta && { meta }),
    };
    return JSON.stringify(response);
};

const error = (message) => {
    const response = {
        status: 'error',
        message,
    };
    return JSON.stringify(response);
};

module.exports.success = success;
module.exports.fail = fail;
module.exports.error = error;
