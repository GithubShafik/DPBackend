export const OrderIncidents = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "OrderIncidents",
    {
      ORIN: {
        type: DataTypes.CHAR(15),
        allowNull: false,
        primaryKey: true,
      },
      ORID: {
        type: DataTypes.CHAR(15),
        allowNull: true,
      },
      OIND: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      OIDE: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      OIST: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
      OIRC: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      OICA: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      OIPA: {
        type: DataTypes.STRING(250),
        allowNull: true,
      },
      OIRD: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      OICD: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      OIRI: {
        type: DataTypes.TINYINT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "OrderIncidents",
    }
  );

  return model;
};