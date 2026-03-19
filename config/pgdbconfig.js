import dotenv from "dotenv";
dotenv.config();

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.PG_DB_NAME,
  process.env.PG_DB_USER_NAME,
  process.env.PG_DB_PASSWORD,
  {
    host: process.env.PG_DB_HOST,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: false,
  }
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

export default sequelize;
