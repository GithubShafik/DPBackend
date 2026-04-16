export const OrderStatus = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "OrderStatus",
    {
      SID: {
        type: DataTypes.TINYINT,
        allowNull: false,
        primaryKey: true,
      },
      STAT: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "OrderStatus",
    }
  );

  return model;
};