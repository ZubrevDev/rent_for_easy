'use strict';

module.exports = (sequelize, DataTypes) => {
  const Apartment = sequelize.define('Apartment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landlordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  // Ассоциации
  Apartment.associate = (models) => {
    Apartment.associate = (models) => {
      Apartment.belongsTo(models.User, { foreignKey: 'landlordId', as: 'landlord' });
      Apartment.hasMany(models.Contract, { foreignKey: 'apartment_id', as: 'contracts' }); // Связь с Contract
    };  };

  return Apartment;
};