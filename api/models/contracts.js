// models/contractModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require('./userModel');
const Apartment = require('./apartmentModel');

// Определение модели Contract с использованием Sequelize
const Contract = sequelize.define("contract", {
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("active", "completed", "terminated"),
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: "contracts",
  timestamps: true,
});

// Связи с другими моделями
Contract.belongsTo(User, { foreignKey: "tenant_id", as: "tenant" });
Contract.belongsTo(Apartment, { foreignKey: "apartment_id", as: "apartment" });

module.exports = Contract;
