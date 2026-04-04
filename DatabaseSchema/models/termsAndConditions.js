export const PDTnC = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "PDTnC",
    {
      TCCU: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TCDP: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TCPG: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TCSC: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "PDTnC",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    }
  );

  model.removeAttribute('id'); // ⭐ IMPORTANT

  return model;
};