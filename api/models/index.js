'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

// Настройка подключения к базе данных
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Загрузка всех моделей в текущей директории
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Установка ассоциаций между моделями
Object.keys(db).forEach((modelName) => {
  console.log(`Загрузка модели: ${modelName}`); // Отладка загрузки модели
  if (db[modelName].associate) {
    console.log(`Установка ассоциаций для модели: ${modelName}`); // Отладка установки ассоциаций
    db[modelName].associate(db);
  }
});

// Экспортируем Sequelize и зарегистрированные модели
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;