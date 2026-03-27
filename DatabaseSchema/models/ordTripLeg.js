export const OrdTripLeg = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "OrdTripLeg",
    {
      OTLID: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      OTID: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      ORID: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      OTLLL: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      OTLDT: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      OTLSP: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      DPID: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "OrdTripLeg",
    }
  );

  return model;
};