// models/userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Определение модели User с использованием Sequelize
const User = sequelize.define("user", {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100], // Пароль должен быть от 8 до 100 символов
    },
  },
  role: {
    type: DataTypes.ENUM("admin", "landlord", "tenant"),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  tableName: "users",
  timestamps: true,
});

module.exports = User;
