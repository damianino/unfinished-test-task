const { DataTypes } = require('sequelize');
const { sequelize } = require('../services/db');

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true,
    },
    creator: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false,
    },
    sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
}, {
    tableName: 'tags',
    timestamps: false,
    createdAt: false,
});

module.exports.Tag = Tag;
