// api/models/tokenModel.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: {
      type: DataTypes.ENUM('refresh', 'access'),
      defaultValue: 'refresh'
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isRevoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Token.associate = (models) => {
    Token.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Token;
};