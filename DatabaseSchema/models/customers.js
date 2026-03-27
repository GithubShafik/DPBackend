export const Customers = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Customers",
    {
      CID: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      CFN: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      CMN: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      CLN: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      CDN: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CTL: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      CADL1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CADL2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CADLM: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CADCT: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CADST: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CADC: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CADZ: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },
      CSTAT: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      CDOB: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      CANN: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      CSPOU: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CCHIL1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CCHIL2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      CSPIN: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      CTNCA: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "Customers",
    }
  );

  return model;
};