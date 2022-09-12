const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../services/db');

const User = sequelize.define('user', {
    uid: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            is: {
                args: /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
                msg: 'password must contain at least one lowercase character, one uppercase character, one number and be at least 8 characters long',
            },
        },
    },
    nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'users',
    timestamps: false,
    createdAt: false,
});

User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
});

module.exports.User = User;
