export const DeliveryPartnerHome = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "DeliveryPartnerHome",
    {
      DPID: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        primaryKey: true, // ✅ VERY IMPORTANT
      },

      DPTT: {
        type: DataTypes.INTEGER, // better than TINYINT here
        allowNull: true,
      },

      DPDIS: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      DPCO2: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      DPAIR: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      DPNOI: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      DPTRE: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      DPCRE: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },

      DPLTP: {
        type: DataTypes.STRING(36),
        allowNull: true,
      },
    },
    {
      tableName: "DeliveryPartnerHome",
      freezeTableName: true,
      timestamps: false,
    
      createdAt: false,
      updatedAt: false,
    }
  );

  return model;
};