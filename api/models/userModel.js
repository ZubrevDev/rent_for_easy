// Этот файл содержит модель User для управления пользователями

'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  });

  // Ассоциации
  User.associate = (models) => {
    User.associate = (models) => {
      User.hasMany(models.Apartment, { foreignKey: 'landlordId', as: 'apartments' }); // Связь с Apartment
      User.hasMany(models.Contract, { foreignKey: 'tenant_id', as: 'contracts' });    // Связь с Contract
    };  };

  return User;
};