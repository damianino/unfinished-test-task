const { Sequelize } = require('sequelize');
const {
    port,
    host,
    database,
    username,
    password,
    } = require('../config/db-config');

const sequelize = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'postgres',
});

module.exports.sequelize = sequelize;
