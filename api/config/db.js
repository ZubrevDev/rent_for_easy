const { Sequelize } = require('sequelize');

const db = new Sequelize('rent_platform', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 8889
});

module.exports = db;
