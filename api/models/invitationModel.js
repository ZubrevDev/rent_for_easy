// models/invitationModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require('./userModel');
const Apartment = require('./apartmentModel');

const Invitation = sequelize.define("invitation", {
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
  invitee_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  invitee_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  tableName: "invitations",
  timestamps: true,
});

// Связи с пользователями и квартирами
Invitation.belongsTo(User, { foreignKey: "landlord_id", as: "landlord" });
Invitation.belongsTo(Apartment, { foreignKey: "apartment_id", as: "apartment" });

module.exports = Invitation;
