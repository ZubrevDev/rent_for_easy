'use strict';

module.exports = (sequelize, DataTypes) => {
  const Invitation = sequelize.define(
    "Invitation",
    {
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
    },
    {
      freezeTableName: true,
      tableName: "invitations",
      timestamps: true,
    }
  );

  // Определение ассоциаций
  Invitation.associate = (models) => {
    Invitation.belongsTo(models.User, { foreignKey: "landlord_id", as: "landlord" });
    Invitation.belongsTo(models.Apartment, { foreignKey: "apartment_id", as: "apartment" });
  };

  return Invitation;
};