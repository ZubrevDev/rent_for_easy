// models/utilityModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Apartment = require('./apartmentModel');

// Определение модели Utility с использованием Sequelize
const Utility = sequelize.define("utility", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: "utilities",
  timestamps: true,
});

// Связь коммунальных платежей с квартирой
Utility.belongsTo(Apartment, { foreignKey: "apartment_id", as: "apartment" });

module.exports = Utility;
