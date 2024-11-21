// api/models/apartmentModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

// Определение модели Apartment с использованием Sequelize
const Apartment = sequelize.define(
  "apartment", // Имя модели (оно используется Sequelize для связи с таблицей)
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landlord_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Имя таблицы будет таким же, как имя модели (в данном случае 'apartment')
    tableName: "apartments", // Указываем точное имя таблицы в базе данных
    timestamps: true, // Используем createdAt и updatedAt (если в таблице они существуют)
  }
);

module.exports = Apartment;
