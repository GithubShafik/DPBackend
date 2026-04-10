export const OrderTrips = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "OrderTrips",
    {
      OTID: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true,
      },
      ORID: {
        type: DataTypes.CHAR(36),
        allowNull: true,
      },
      OTSA1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTSA2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTSA3: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTSC: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTSZ: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },
      OTSS: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTSCO: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTSLL: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      OTDA1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTDA2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTDA3: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTDC: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTDZ: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },
      OTDS: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTDCO: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OTDLL: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      OTDN: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Order trip destination contact name",
      },
      OTDO: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "Order trip destination contact phone",
      },
      OTSD: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      OTDD: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "OrderTrips",
    }
  );

  return model;
};