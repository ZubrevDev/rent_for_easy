// models/notificationModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require('./userModel');

const Notification = sequelize.define("notification", {
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
  recipient_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  channel: {
    type: DataTypes.ENUM("email", "sms", "web", "push"),
    allowNull: false,
  },
}, {
  freezeTableName: true,
  tableName: "notifications",
  timestamps: true,
});

Notification.belongsTo(User, { foreignKey: "recipient_id", as: "recipient" });

module.exports = Notification;
