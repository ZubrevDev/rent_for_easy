// models/apartmentModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require('./userModel'); // Импорт модели пользователя

// Определение модели Apartment с использованием Sequelize
const Apartment = sequelize.define("apartment", {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  landlord_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Ссылка на таблицу пользователей
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  freezeTableName: true,
  tableName: "apartments",
  timestamps: true,
});

// Убедитесь, что модель User импортирована корректно, иначе связь не получится
Apartment.belongsTo(User, { foreignKey: "landlord_id", as: "landlord" });

module.exports = Apartment;
