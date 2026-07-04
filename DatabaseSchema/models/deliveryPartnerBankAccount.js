import { DataTypes } from "sequelize";

export const DeliveryPartnerBankAccount = (sequelize) => {
  return sequelize.define(
    "DeliveryPartnerBankAccounts",
    {
      DPBAID: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      DPID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      BID: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      AHN: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      IFSCCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ACNO: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CACNO: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DPBAStat: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      DPBACAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      DPBAUAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "DeliveryPartnerBankAccounts",
      timestamps: false,
    }
  );
};
