export const Orders = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Orders",
    {
      ORID: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      ORDT: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ORVL: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      ORST: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      ORDD: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      OOID: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      DPID: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },
      ORCD: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },
      CID: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "Orders",
    }
  );

  return model;
};