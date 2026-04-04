export const DeliveryPartner = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "DeliveryPartner",
    {
      DPID: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },

      DPFN: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },

      DPMN: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },

      DPLN: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },

      DPDN: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      DPTL: {
        type: DataTypes.TINYINT,
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

      DPSTAT: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },

      DPDOB: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      DPANN: {
        type: DataTypes.DATE,
        allowNull: true,
      },

       AttID: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      DPSPOU: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      DPCHIL1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      DPCHIL2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      DPSPIN: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      DPRMN: {
        type: DataTypes.CHAR(10),
        allowNull: true,
      },

      DPRNC: {
        type: DataTypes.CHAR(3),
        allowNull: true,
      },
    },
    {
      tableName: "DeliveryPartner",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return model;
};