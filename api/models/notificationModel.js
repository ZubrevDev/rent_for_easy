'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "Notification",
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "sent", "failed"),
        defaultValue: "pending",
      },
      channel: {
        type: DataTypes.ENUM("email", "sms", "web", "push"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "notifications",
      timestamps: true,
    }
  );

  // Ассоциации
  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: "recipient_id", as: "recipient" });
  };

  return Notification;
};