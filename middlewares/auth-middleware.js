import jwt from "jsonwebtoken";
import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { models } = db;
const { _delivery_partner } = models;

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token from header
      token = authorization.split(" ")[1];

      // Verify Token
      const data = jwt.verify(token, process.env.JWT_SECRET_KEY);

      // Get delivery partner from token
      const partner = await _delivery_partner.findOne({
        where: { DPID: data.id },
      });

      if (!partner) {
        return res
          .status(401)
          .send({ status: "failed", message: "No user found" });
      }

      req.user = partner;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;
