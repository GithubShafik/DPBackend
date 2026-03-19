import db from "../config/database.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/GenerateToken.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const { sequelize, models } = db;
const { _delivery_partner, _delivery_partner_details , _delivery_partner_location } = models;

const HARDCODED_OTP = "1234";
const otpStore = new Map();

class UserServices {

  /* =========================
     SEND OTP
  ========================= */

  static async handlePhoneLogin(req) {
    try {
      const { country_code, contact } = req.body;

      const key = `${country_code}_${contact}`;

      otpStore.set(key, {
        code: HARDCODED_OTP,
        createdAt: new Date(),
      });

      console.log(`OTP for ${key}: ${HARDCODED_OTP}`);

      return true;
    } catch (error) {
      throw error;
    }
  }

  /* =========================
     VERIFY OTP + LOGIN
  ========================= */

  static async handlePhoneLoginVerify(req) {
    let t;

    try {
      const { country_code, contact, code } = req.body;

      const key = `${country_code}_${contact}`;
      const storedOtp = otpStore.get(key);

      if (!storedOtp) throw new Error("OTP not found");

      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

      if (storedOtp.createdAt < tenMinutesAgo) {
        otpStore.delete(key);
        throw new Error("OTP expired");
      }

      if (storedOtp.code !== code) {
        throw new Error("Invalid OTP");
      }

      otpStore.delete(key);

      let partner = await _delivery_partner.findOne({
        where: {
          DPRMN: contact,
          DPRNC: country_code,
        },
      });

      if (!partner) {
        t = await sequelize.transaction();

        const dpId = `DP${Date.now().toString().slice(-8)}`;

        partner = await _delivery_partner.create(
          {
            DPID: dpId,
            DPRMN: contact,
            DPRNC: country_code,
            DPSTAT: 0,
          },
          { transaction: t }
        );

        await t.commit();
      }

      const payload = {
        id: partner.DPID,
        contact: partner.DPRMN,
      };

      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);

      return {
        user: partner,
        accessToken,
        refreshToken,
        isNewUser: !partner.DPFN,
      };
    } catch (error) {
      if (t) await t.rollback();
      throw error;
    }
  }

  /* =========================
     VERIFY OTP ONLY
  ========================= */

  static async handlePhoneVerifyOnly(req) {
    try {
      const { country_code, contact, code } = req.body;

      const key = `${country_code}_${contact}`;
      const storedOtp = otpStore.get(key);

      if (!storedOtp) throw new Error("OTP not found");

      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

      if (storedOtp.createdAt < tenMinutesAgo) {
        otpStore.delete(key);
        throw new Error("OTP expired");
      }

      if (storedOtp.code !== code) {
        throw new Error("Invalid OTP");
      }

      otpStore.delete(key);

      return "OTP verified";
    } catch (error) {
      throw error;
    }
  }

  /* =========================
     REGISTER DELIVERY PARTNER
  ========================= */

  static async handleRegisterPartner(req) {
    let t;

    try {
      const { DPID } = req.body;

      if (!DPID) throw new Error("DPID is required");

      const partner = await _delivery_partner.findOne({
        where: { DPID },
      });

      if (!partner) throw new Error("Partner not found");

      t = await sequelize.transaction();

      /* UPDATE PARTNER TABLE */

      await _delivery_partner.update(
        {
          ...req.body,
          DPSTAT: 1,
        },
        {
          where: { DPID },
          transaction: t,
        }
      );

      /* CHECK IF DETAILS EXIST */

      const existingDetail = await _delivery_partner_details.findOne({
        where: { DPID },
      });

      if (!existingDetail) {
        const detailId = `DPD${Date.now().toString().slice(-7)}`;

        await _delivery_partner_details.create(
          {
            DPDID: detailId,
            DPID,
            ...req.body,
          },
          { transaction: t }
        );
      } else {
        await _delivery_partner_details.update(
          {
            ...req.body,
          },
          {
            where: { DPID },
            transaction: t,
          }
        );
      }

      await t.commit();

      const updatedPartner = await _delivery_partner.findOne({
        where: { DPID },
        include: [
          {
            model: _delivery_partner_details,
            as: "details",
          },
        ],
      });

      return updatedPartner;
    } catch (error) {
      if (t) await t.rollback();
      throw error;
    }
  }

  /* =========================
     UPDATE PROFILE
  ========================= */

  static async handleUpdateProfile(req) {
    let t;

    try {
      const { DPID } = req.body;

      if (!DPID) throw new Error("DPID required");

      const partner = await _delivery_partner.findOne({
        where: { DPID },
      });

      if (!partner) throw new Error("Partner not found");

      t = await sequelize.transaction();

      await _delivery_partner.update(req.body, {
        where: { DPID },
        transaction: t,
      });

      await t.commit();

      return await _delivery_partner.findOne({
        where: { DPID },
      });
    } catch (error) {
      if (t) await t.rollback();
      throw error;
    }
  }

  /* =========================
     GENERATE ACCESS TOKEN
  ========================= */

  static async handleGenerateAccessToken(req) {
    try {
      const { refreshToken } = req.body;

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET_KEY
      );

      const partner = await _delivery_partner.findOne({
        where: { DPID: decoded.id },
      });

      if (!partner) throw new Error("Unauthorized");

      const payload = {
        id: partner.DPID,
        contact: partner.DPRMN,
      };

      const accessToken = generateAccessToken(payload);

      return {
        user: partner,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new Error("Unauthorized");
    }
  }
}

export default UserServices;