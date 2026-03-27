import { sendError, sendResult } from "../constant/HttpResponse.js";

import UserServices from "../services/Auth.js";
import dotenv from "dotenv";
import DPServices from "../services/DP.js";
dotenv.config();

class UserController {
  static PhoneLogin = async (req, res) => {
    try {
      const { country_code, contact } = req.body;

      // ✅ Input validation
      if (!country_code || !contact) {
        return res.status(400).send({
          status: "failed",
          message: "country_code and contact are required",
        });
      }

      const response = await UserServices.handlePhoneLogin(req);

      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "OTP sent successfully",
      });
    } catch (error) {
      console.error("❌ PhoneLogin Error:", error);

      if (error?.status) {
        return sendError({
          errorCode: error.status,
          res,
          error: error.message,
          message: error.message,
        });
      }

      return sendError({
        errorCode: 500,
        res,
        error: error?.message,
        message: "Internal server error",
      });
    }
  };

  static VerifyPhoneLogin = async (req, res) => {
    try {
      const { country_code, contact, code } = req.body;

      // ✅ Input validation
      if (!country_code || !contact || !code) {
        return res.status(400).send({
          status: "failed",
          message: "country_code, contact and code are required",
        });
      }

      const response = await UserServices.handlePhoneLoginVerify(req);

      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "Login successful",
      });
    } catch (error) {
      console.error("❌ VerifyPhoneLogin Error:", error);

      if (error?.status) {
        return sendError({
          errorCode: error.status,
          res,
          error: error.message,
          message: error.message,
        });
      }

      return sendError({
        errorCode: 500,
        res,
        error: error?.message || error,
        message: typeof error === "string" ? error : "Internal server error",
      });
    }
  };

  static VerifyPhone = async (req, res) => {
    try {
      const { country_code, contact, code } = req.body;

      // ✅ Input validation
      if (!country_code || !contact || !code) {
        return res.status(400).send({
          status: "failed",
          message: "country_code, contact and code are required",
        });
      }

      const response = await UserServices.handlePhoneVerifyOnly(req);

      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "OTP verified successfully",
      });
    } catch (error) {
      console.error("❌ VerifyPhone Error:", error);

      if (error?.status) {
        return sendError({
          errorCode: error.status,
          res,
          error: error.message,
          message: error.message,
        });
      }

      return sendError({
        errorCode: 500,
        res,
        error: error?.message || error,
        message: typeof error === "string" ? error : "Internal server error",
      });
    }
  };

  static RegisterPartner = async (req, res) => {
    try {
      const { DPID } = req.body;

      if (!DPID) {
        return res.status(400).send({
          status: "failed",
          message: "DPID is required",
        });
      }

      const response = await UserServices.handleRegisterPartner(req);

      return sendResult({
        resCode: 201,
        res,
        result: response,
        message: "Registration successful",
      });
    } catch (error) {
      console.error("❌ RegisterPartner Error:", error);

      if (error?.status) {
        return sendError({
          errorCode: error.status,
          res,
          error: error.message,
          message: error.message,
        });
      }

      return sendError({
        errorCode: 500,
        res,
        error: error?.message,
        message: "Internal server error",
      });
    }
  };

  static updateUserProfile = async (req, res) => {
    try {
      const response = await UserServices.handleUpdateProfile(req);
      res.status(200).send({
        status: "success",
        message: "Profile Updated Successfully",
        result: response,
      });
    } catch (error) {
      console.error("❌ UpdateProfile Error:", error);

      if (error?.status) {
        return sendError({
          errorCode: error.status,
          res,
          error: error.message,
          message: error.message,
        });
      }

      res.status(500).send({
        status: "failed",
        message: "Profile update failed",
        error: error?.message,
      });
    }
  };

  static getAccessToken = async (req, res) => {
    try {
      const { refreshToken } = req.body;
      // ✅ Input validation
      if (!refreshToken) {
        return res.status(400).send({
          status: "failed",
          message: "refreshToken is required",
        });
      }
      const response = await UserServices.handleGenerateAccessToken(req);
      return sendResult({
        resCode: 201,
        res,
        result: response,
        message: "Access Token Refreshed Successfully",
      });
    } catch (error) {
      if (error === "UnAuthorized") {
        return sendError({
          errorCode: 401,
          res,
          error: error,
          message: "UnAuthorized Refresh Token",
        });
      }
      if (error?.status) {
        return sendError({
          errorCode: error.status,
          res,
          error: error,
          message: error.message,
        });
      }
      return sendError({
        errorCode: 500,
        res,
        error: error?.message,
        message: "Internal server error",
      });
    }
  };

  static saveAndUpdatDPLocation = async (req, res) => {
  try {
    const response = await DPServices.handleSaveOrUpdateDPLocation(req);

    return sendResult({
      resCode: 200,
      res,
      result: response,
      message: "Location saved/updated successfully",
    });
  } catch (error) {
    console.error("❌ Location Update Error:", error);

    return sendError({
      errorCode: 500,
      res,
      error: error?.message,
      message: "Failed to save location",
    });
  }
};

  static acceptOrder = async (req, res) => {
    try {
      const response = await DPServices.handleAcceptOrder(req);
      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "Order accepted successfully",
      });
    } catch (error) {
      console.error("❌ AcceptOrder Error:", error);
      return sendError({
        errorCode: 500,
        res,
        error: error?.message,
        message: "Failed to accept order",
      });
    }
  };

  static getOrderDetails = async (req, res) => {
    try {
      const response = await DPServices.handleGetOrderDetails(req);
      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "Order details fetched successfully",
      });
    } catch (error) {
      console.error("❌ GetOrderDetails Error:", error);
      return sendError({
        errorCode: 500,
        res,
        error: error?.message,
        message: "Failed to fetch order details",
      });
    }
  };
}

export default UserController;
