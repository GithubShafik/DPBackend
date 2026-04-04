export const Attachments = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Attachments",
    {
      AttID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      AttURL: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      CAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      UAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      tableName: "Attachments",
    }
  );

  return model;
};