import { sendError, sendResult } from "../constant/HttpResponse.js";
import ReportServices from "../services/Report.js";
import dotenv from "dotenv";

dotenv.config();

class ReportController {
  /**
   * Get order history for delivery partner
   * GET /api/v1/deliveryPartner/reports/orderHistory
   */
  static getOrderHistory = async (req, res) => {
    try {
      const response = await ReportServices.handleGetOrderHistory(req);

      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "Order history fetched successfully",
      });
    } catch (error) {
      console.error("❌ GetOrderHistory Error:", error);

      const statusCode = error.message?.includes("required") ? 400 : 500;

      return sendError({
        errorCode: statusCode,
        res,
        error: error?.message,
        message: error?.message || "Failed to fetch order history",
      });
    }
  };

  /**
   * Get detailed report for a specific order
   * GET /api/v1/deliveryPartner/reports/orderDetail/:orderId
   */
  static getOrderDetailReport = async (req, res) => {
    try {
      const response = await ReportServices.handleGetOrderDetailReport(req);

      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "Order detail report fetched successfully",
      });
    } catch (error) {
      console.error("❌ GetOrderDetailReport Error:", error);

      const statusCode = error.message?.includes("not found") 
        ? 404 
        : error.message?.includes("Unauthorized") 
        ? 403 
        : 500;

      return sendError({
        errorCode: statusCode,
        res,
        error: error?.message,
        message: error?.message || "Failed to fetch order detail report",
      });
    }
  };

  /**
   * Get earnings report for delivery partner
   * GET /api/v1/deliveryPartner/reports/earnings
   */
  static getEarningsReport = async (req, res) => {
    try {
      const response = await ReportServices.handleGetEarningsReport(req);

      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "Earnings report fetched successfully",
      });
    } catch (error) {
      console.error("❌ GetEarningsReport Error:", error);

      const statusCode = error.message?.includes("required") ? 400 : 500;

      return sendError({
        errorCode: statusCode,
        res,
        error: error?.message,
        message: error?.message || "Failed to fetch earnings report",
      });
    }
  };

  /**
   * Export order history (prepares data for PDF generation)
   * GET /api/v1/deliveryPartner/reports/export
   */
  static exportOrderHistory = async (req, res) => {
    try {
      const response = await ReportServices.handleExportOrderHistory(req);

      return sendResult({
        resCode: 200,
        res,
        result: response,
        message: "Order history export data prepared successfully",
      });
    } catch (error) {
      console.error("❌ ExportOrderHistory Error:", error);

      const statusCode = error.message?.includes("required") ? 400 : 500;

      return sendError({
        errorCode: statusCode,
        res,
        error: error?.message,
        message: error?.message || "Failed to export order history",
      });
    }
  };

  /**
   * Get order summary/stats for delivery partner dashboard
   * GET /api/v1/deliveryPartner/reports/summary
   */
  static getOrderSummary = async (req, res) => {
    try {
      const { dpId } = req.query;
      const partnerId = req.user?.DPID || dpId;

      if (!partnerId) {
        return sendError({
          errorCode: 400,
          res,
          error: "DPID is required",
          message: "Delivery partner ID is required",
        });
      }

      const summary = await ReportServices.getOrderSummary(partnerId);

      return sendResult({
        resCode: 200,
        res,
        result: summary,
        message: "Order summary fetched successfully",
      });
    } catch (error) {
      console.error("❌ GetOrderSummary Error:", error);

      return sendError({
        errorCode: 500,
        res,
        error: error?.message,
        message: "Failed to fetch order summary",
      });
    }
  };
}

export default ReportController;
