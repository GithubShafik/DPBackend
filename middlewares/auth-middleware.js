import jwt from "jsonwebtoken";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { models } = db;
const { _delivery_partner } = models;

const checkUserAuth = async (req, res, next) => {
  try {
    console.log("HEADERS:", req.headers); // DEBUG

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "failed",
        message: "Unauthorized User, No Token",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const partner = await _delivery_partner.findOne({
      where: { DPID: decoded.id },
    });

    if (!partner) {
      return res.status(401).json({
        status: "failed",
        message: "User not found",
      });
    }

    req.user = partner;

    next();
  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      status: "failed",
      message: "Unauthorized User",
    });
  }
};

export default checkUserAuth;