import db from "../config/database.js";
import { Op } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { sequelize, models } = db;
const { _orders, _order_trips, _ord_trip_leg, _customers, _delivery_partner , _delivery_partner_home } = models;

class ReportServices {
  /**
   * Get order history for a delivery partner with filters
   * @param {Object} req - Express request object
   * @returns {Object} - Order history with pagination
   */
  static async handleGetOrderHistory(req) {
    try {
      const dpId = req.user?.DPID || req.body?.DPID || req.query?.dpId;
      
      if (!dpId) {
        throw new Error("DPID is required");
      }

      // Extract query parameters for filtering
      const {
        startDate,
        endDate,
        status,
        page = 1,
        limit = 10,
        sortBy = "ORDT",
        sortOrder = "DESC"
      } = req.query;

      // Build where clause
      const whereClause = { DPID: dpId };

      // Date range filter
      if (startDate || endDate) {
        whereClause.ORDT = {};
        if (startDate) {
          whereClause.ORDT[Op.gte] = new Date(startDate);
        }
        if (endDate) {
          whereClause.ORDT[Op.lte] = new Date(endDate);
        }
      }

      // Status filter
      if (status) {
        whereClause.ORST = status;
      }

      // Calculate pagination
      const offset = (parseInt(page) - 1) * parseInt(limit);
      const parsedLimit = parseInt(limit);

      // Fetch orders with related data
      const { count, rows: orders } = await _orders.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: _customers,
            as: "customer",
            attributes: ["CID", "CFN", "CLN", "CDN", "CEM"]
          },
          {
            model: _order_trips,
            as: "trips",
            attributes: ["OTID", "OTSA1", "OTSA2", "OTSC", "OTSS", "OTDA1", "OTDA2", "OTDC", "OTDS", "OTSD", "OTDD"]
          },
          {
            model: _ord_trip_leg,
            as: "trackingHistory",
            attributes: ["OTLID", "OTLDT", "OTLLL"],
            required: false
          }
        ],
        order: [[sortBy, sortOrder]],
        limit: parsedLimit,
        offset: offset,
        distinct: true
      });

      // Calculate summary statistics
      const summary = await ReportServices.getOrderSummary(dpId, whereClause);

      return {
        orders,
        pagination: {
          total: count,
          page: parseInt(page),
          limit: parsedLimit,
          totalPages: Math.ceil(count / parsedLimit)
        },
        summary
      };
    } catch (error) {
      console.error("❌ GetOrderHistory Error:", error);
      throw error;
    }
  }

  /**
   * Get summary statistics for delivery partner orders
   * @param {string} dpId - Delivery Partner ID
   * @param {Object} baseWhereClause - Base where clause for filtering
   * @returns {Object} - Summary statistics
   */
  static async getOrderSummary(dpId, baseWhereClause = {}) {
    try {
      // Total orders count
      const totalOrders = await _orders.count({
        where: { DPID: dpId, ...baseWhereClause }
      });

      // Orders by status
      const statusCounts = await _orders.findAll({
        where: { DPID: dpId, ...baseWhereClause },
        attributes: [
          "ORST",
          [sequelize.fn("COUNT", sequelize.col("ORST")), "count"]
        ],
        group: ["ORST"],
        raw: true
      });

      // Total earnings (sum of order values)
      const earnings = await _orders.findAll({
        where: { 
          DPID: dpId, 
          ORST: { [Op.in]: ["Delivered", "Completed"] },
          ...baseWhereClause 
        },
        attributes: [
          [sequelize.fn("SUM", sequelize.col("ORVL")), "totalEarnings"],
          [sequelize.fn("COUNT", sequelize.col("ORID")), "completedOrders"]
        ],
        raw: true
      });

      // Format status counts
      const statusBreakdown = {};
      statusCounts.forEach(item => {
        statusBreakdown[item.ORST] = parseInt(item.count);
      });

      return {
        totalOrders,
        statusBreakdown,
        totalEarnings: parseFloat(earnings[0]?.totalEarnings || 0).toFixed(2),
        completedOrders: parseInt(earnings[0]?.completedOrders || 0)
      };
    } catch (error) {
      console.error("❌ GetOrderSummary Error:", error);
      return {
        totalOrders: 0,
        statusBreakdown: {},
        totalEarnings: "0.00",
        completedOrders: 0
      };
    }
  }

  /**
   * Get detailed report for a specific order
   * @param {Object} req - Express request object
   * @returns {Object} - Detailed order information
   */
  static async handleGetOrderDetailReport(req) {
    try {
      const { orderId } = req.params;
      const dpId = req.user?.DPID || req.body?.DPID;

      if (!orderId) {
        throw new Error("Order ID is required");
      }

      const order = await _orders.findOne({
        where: { ORID: orderId },
        include: [
          {
            model: _customers,
            as: "customer",
            attributes: ["CID", "CFN", "CLN", "CDN", "CEM", "CADL1", "CADL2", "CADCT", "CADST"]
          },
          {
            model: _order_trips,
            as: "trips",
            attributes: ["OTID", "OTSA1", "OTSA2", "OTSA3", "OTSC", "OTSZ", "OTSS", "OTSCO", "OTDA1", "OTDA2", "OTDA3", "OTDC", "OTDZ", "OTDS", "OTDCO", "OTSD", "OTDD"]
          },
          {
            model: _ord_trip_leg,
            as: "trackingHistory",
            attributes: ["OTLID", "OTLDT", "OTLLL"],
            order: [["OTLDT", "ASC"]]
          }
        ]
      });

      if (!order) {
        throw new Error("Order not found");
      }

      // Verify the order belongs to the requesting partner (if dpId provided)
      if (dpId && order.DPID !== dpId) {
        throw new Error("Unauthorized: Order does not belong to this partner");
      }

      return order;
    } catch (error) {
      console.error("❌ GetOrderDetailReport Error:", error);
      throw error;
    }
  }

  /**
   * Get earnings report for delivery partner
   * @param {Object} req - Express request object
   * @returns {Object} - Earnings breakdown
   */
  static async handleGetEarningsReport(req) {
    try {
      const dpId = req.user?.DPID || req.body?.DPID || req.query?.dpId;
      
      if (!dpId) {
        throw new Error("DPID is required");
      }

      const { period = "monthly", year = new Date().getFullYear() } = req.query;

      let dateFormat;
      let groupBy;

      switch (period) {
        case "daily":
          dateFormat = "%Y-%m-%d";
          groupBy = sequelize.fn("DATE", sequelize.col("ORDT"));
          break;
        case "weekly":
          dateFormat = "%Y-%u";
          groupBy = sequelize.fn("YEARWEEK", sequelize.col("ORDT"));
          break;
        case "monthly":
        default:
          dateFormat = "%Y-%m";
          groupBy = sequelize.fn("DATE_FORMAT", sequelize.col("ORDT"), "%Y-%m");
          break;
      }

      const earnings = await _orders.findAll({
        where: {
          DPID: dpId,
          ORST: { [Op.in]: ["Delivered", "Completed"] },
          ORDT: {
            [Op.gte]: new Date(`${year}-01-01`),
            [Op.lte]: new Date(`${year}-12-31`)
          }
        },
        attributes: [
          [groupBy, "period"],
          [sequelize.fn("SUM", sequelize.col("ORVL")), "totalEarnings"],
          [sequelize.fn("COUNT", sequelize.col("ORID")), "orderCount"]
        ],
        group: [groupBy],
        order: [[groupBy, "ASC"]],
        raw: true
      });

      // Calculate overall totals
      const totalStats = await _orders.findAll({
        where: {
          DPID: dpId,
          ORST: { [Op.in]: ["Delivered", "Completed"] },
          ORDT: {
            [Op.gte]: new Date(`${year}-01-01`),
            [Op.lte]: new Date(`${year}-12-31`)
          }
        },
        attributes: [
          [sequelize.fn("SUM", sequelize.col("ORVL")), "totalEarnings"],
          [sequelize.fn("COUNT", sequelize.col("ORID")), "totalOrders"]
        ],
        raw: true
      });

      return {
        period,
        year: parseInt(year),
        breakdown: earnings.map(item => ({
          period: item.period,
          earnings: parseFloat(item.totalEarnings || 0).toFixed(2),
          orders: parseInt(item.orderCount || 0)
        })),
        summary: {
          totalEarnings: parseFloat(totalStats[0]?.totalEarnings || 0).toFixed(2),
          totalOrders: parseInt(totalStats[0]?.totalOrders || 0)
        }
      };
    } catch (error) {
      console.error("❌ GetEarningsReport Error:", error);
      throw error;
    }
  }

  /**
   * Export order history as PDF (prepares data for PDF generation)
   * @param {Object} req - Express request object
   * @returns {Object} - Data formatted for PDF export
   */
  static async handleExportOrderHistory(req) {
    try {
      const dpId = req.user?.DPID || req.body?.DPID || req.query?.dpId;
      
      if (!dpId) {
        throw new Error("DPID is required");
      }

      const { startDate, endDate, status } = req.query;

      // Get partner details
      const partner = await _delivery_partner.findOne({
        where: { DPID: dpId },
        attributes: ["DPID", "DPFN", "DPMN", "DPLN", "DPRMN"]
      });

      // Build where clause
      const whereClause = { DPID: dpId };

      if (startDate || endDate) {
        whereClause.ORDT = {};
        if (startDate) whereClause.ORDT[Op.gte] = new Date(startDate);
        if (endDate) whereClause.ORDT[Op.lte] = new Date(endDate);
      }

      if (status) {
        whereClause.ORST = status;
      }

      // Fetch all orders for export
      const orders = await _orders.findAll({
        where: whereClause,
        include: [
          {
            model: _customers,
            as: "customer",
            attributes: ["CFN", "CLN", "CDN"]
          },
          {
            model: _order_trips,
            as: "trips",
            attributes: ["OTSA1", "OTSC", "OTDA1", "OTDC"]
          }
        ],
        order: [["ORDT", "DESC"]]
      });

      // Calculate totals
      const totalEarnings = orders
        .filter(o => ["Delivered", "Completed"].includes(o.ORST))
        .reduce((sum, o) => sum + parseFloat(o.ORVL || 0), 0);

      return {
        partner: partner?.toJSON() || { DPID: dpId },
        reportDate: new Date().toISOString(),
        filterCriteria: {
          startDate: startDate || null,
          endDate: endDate || null,
          status: status || "All"
        },
        orders: orders.map(o => ({
          orderId: o.ORID,
          date: o.ORDT,
          status: o.ORST,
          value: parseFloat(o.ORVL || 0).toFixed(2),
          customer: o.customer ? `${o.customer.CFN || ""} ${o.customer.CLN || ""}`.trim() : "N/A",
          customerContact: o.customer?.CDN || "N/A",
          pickup: o.trips?.[0] ? `${o.trips[0].OTSA1 || ""}, ${o.trips[0].OTSC || ""}`.trim() : "N/A",
          delivery: o.trips?.[0] ? `${o.trips[0].OTDA1 || ""}, ${o.trips[0].OTDC || ""}`.trim() : "N/A"
        })),
        summary: {
          totalOrders: orders.length,
          totalEarnings: totalEarnings.toFixed(2),
          statusBreakdown: orders.reduce((acc, o) => {
            acc[o.ORST] = (acc[o.ORST] || 0) + 1;
            return acc;
          }, {})
        }
      };
    } catch (error) {
      console.error("❌ ExportOrderHistory Error:", error);
      throw error;
    }
  }

  /**
   * Get delivery partner home records for a delivery partner with filters
   * @param {Object} req - Express request object
   * @returns {Object} - delivery partner home
   */
  static async handleGetDeliveryPartnerHome(req) {
  try {
    const dpId = req.user?.DPID || req.body?.DPID || req.query?.dpId;

    if (!dpId) {
      throw new Error("DPID is required");
    }

    const summary = await _delivery_partner_home.findAll({
      where: { DPID: dpId },
      raw: true,
    });

    return { summary };
  } catch (error) {
    console.error("❌ GetDeliveryPartnerHome Error:", error);
    throw error;
  }
}
}

export default ReportServices;
