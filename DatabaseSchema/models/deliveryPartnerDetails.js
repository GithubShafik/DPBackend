export const DeliveryPartnerDetails = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "DeliveryPartnerDetails",
    {
      DPDID: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      DPID: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      APID: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      DPAO: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DPAL: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      DPAS: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      DPADL1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DPADL2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DPADLM: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DPADCT: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DPADST: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DPADC: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      DPADZ: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "DeliveryPartnerDetails",
    }
  );

  return model;
};