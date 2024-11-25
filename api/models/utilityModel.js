'use strict';

module.exports = (sequelize, DataTypes) => {
  const Utility = sequelize.define(
    "Utility",
    {
      type: {
        type: DataTypes.ENUM("electricity", "hot_water", "cold_water", "cleaning", "other"),
        allowNull: false,
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: true, // Сумма может быть добавлена арендодателем позже
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      meter_reading: {
        type: DataTypes.FLOAT,
        allowNull: true, // Показания счетчиков, если применимо
      },
      receipt_image: {
        type: DataTypes.STRING,
        allowNull: true, // URL изображения квитанции
      },
      tenant_photo: {
        type: DataTypes.STRING,
        allowNull: true, // Фото счетчика от арендатора
      },
      status: {
        type: DataTypes.ENUM("pending", "confirmed", "paid"),
        defaultValue: "pending",
      },
      visible_to_tenant: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Позволяет арендодателю скрыть платеж от арендатора
      },
    },
    {
      freezeTableName: true,
      tableName: "utilities",
      timestamps: true,
    }
  );

  // Ассоциации
  Utility.associate = (models) => {
    Utility.belongsTo(models.Apartment, { foreignKey: "apartment_id", as: "apartment" });
    Utility.belongsTo(models.User, { foreignKey: "tenant_id", as: "tenant" });
  };

  return Utility;
};