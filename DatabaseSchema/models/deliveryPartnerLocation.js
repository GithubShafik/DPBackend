export const DPLocation = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "DPLocation",
    {
      DPID: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        primaryKey: true,
      },
      DPOID: {
        type: DataTypes.CHAR(15),
        allowNull: true,
      },
      DPTID: {
        type: DataTypes.CHAR(15),
        allowNull: true,
      },
      DPSTA: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      DPCLL: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      DPCDT: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      DPCSP: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "DPLocation",
    }
  );

  return model;
};