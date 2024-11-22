// models/utilityModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Apartment = require('./apartmentModel');
const User = require('./userModel');

// Определение модели Utility с использованием Sequelize
const Utility = sequelize.define("utility", {
  type: {
    type: DataTypes.ENUM("electricity", "hot_water", "cold_water", "cleaning", "other"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: true, // Сумма может быть добавлена арендодателем позже
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  meter_reading: {
    type: DataTypes.FLOAT,
    allowNull: true, // Показания счетчиков, если применимо
  },
  receipt_image: {
    type: DataTypes.STRING,
    allowNull: true, // URL изображения квитанции
  },
  tenant_photo: {
    type: DataTypes.STRING,
    allowNull: true, // Фото счетчика от арендатора
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "paid"),
    defaultValue: "pending",
  },
  visible_to_tenant: {
    type: DataTypes.BOOLEAN,
    defaultValue: true, // Позволяет арендодателю скрыть платеж от арендатора
  },
}, {
  freezeTableName: true,
  tableName: "utilities",
  timestamps: true,
});

// Связь коммунальных платежей с квартирой и арендатором
Utility.belongsTo(Apartment, { foreignKey: "apartment_id", as: "apartment" });
Utility.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });

module.exports = Utility;
