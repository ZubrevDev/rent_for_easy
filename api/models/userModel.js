// api/models/userModel.js
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
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'landlord'),
      defaultValue: 'user'
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^\+?[\d\s-]+$/
      }
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: true
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
    User.hasMany(models.Token, {
      foreignKey: 'userId',
      as: 'tokens'
    });
  };

  return User;
};