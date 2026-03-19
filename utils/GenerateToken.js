import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateRefreshToken(user) {
  return jwt.sign({ id: user.id, contact: user.contact }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
}
export function generateAccessToken(user) {
  return jwt.sign({ id: user.id, contact: user.contact }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
}