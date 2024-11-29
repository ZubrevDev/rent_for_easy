// api/models/userModel.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: true // Если вы хотите допустить пустое значение
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\+?[\d\s-]+$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM('landlord', 'tenant'),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Пароль обязателен
    },
  }, {
    timestamps: true, // Для автоматического создания полей createdAt и updatedAt
  });

  User.associate = (models) => {
    User.hasMany(models.Apartment, { 
      foreignKey: 'landlordId', 
      as: 'apartments' 
    });
    User.hasMany(models.Contract, { 
      foreignKey: 'tenant_id', 
      as: 'contracts' 
    });
  };

  return User;
};