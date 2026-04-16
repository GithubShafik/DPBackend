export const OrderIncidentReasons = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "OrderIncidentReasons",
    {
      OIRI: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      OIRD: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "OrderIncidentReasons",
    }
  );

  return model;
};