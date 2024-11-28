// Этот файл содержит модель Contract для управления контрактами

module.exports = (sequelize, DataTypes) => {
  const Contract = sequelize.define(
    "Contract",
    {
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "completed", "terminated"),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      tableName: "contracts",
      timestamps: true,
    }
  );

  Contract.associate = (models) => {
    Contract.belongsTo(models.User, { foreignKey: "tenant_id", as: "tenant" });
    Contract.belongsTo(models.Apartment, { foreignKey: "apartment_id", as: "apartment" });
  };

  return Contract;
};