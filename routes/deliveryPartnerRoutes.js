import express from "express";
import UserController from "../controllers/userController.js";
import ReportController from "../controllers/reportController.js";
import OrderStatusController from "../controllers/orderStatusController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/deliveryPartner/saveAndUpdatDPLocation:
 *   post:
 *     summary: Save or Update Delivery Partner Location
 *     description: Save a new delivery partner location if not exists, otherwise update the existing location.
 *     tags:
 *       - Delivery Partner Location
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DPOID:
 *                 type: string
 *                 example: "ORD123456"
 *               DPTID:
 *                 type: string
 *                 example: "TRIP123456"
 *               DPSTA:
 *                 type: boolean
 *                 example: true
 *               DPCLL:
 *                 type: string
 *                 description: Current Latitude and Longitude
 *                 example: "21.1458,79.0882"
 *               DPCSP:
 *                 type: number
 *                 format: decimal
 *                 example: 32.5
 *     responses:
 *       200:
 *         description: Location saved or updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Location saved/updated successfully
 *                 result:
 *                   type: object
 *                   properties:
 *                     DPID:
 *                       type: string
 *                       example: DP12345678
 *                     DPOID:
 *                       type: string
 *                       example: ORD123456
 *                     DPCLL:
 *                       type: string
 *                       example: "21.1458,79.0882"
 *                     DPCSP:
 *                       type: number
 *                       example: 32.5
 *                     DPCDT:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/saveAndUpdatDPLocation" , checkUserAuth ,UserController.saveAndUpdatDPLocation)

/**
 * @swagger
 * /api/v1/deliveryPartner/acceptOrder:
 *   post:
 *     summary: Accept an order
 *     tags: [Delivery Partner]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - dpId
 *             properties:
 *               orderId: { type: string }
 *               dpId: { type: string }
 *     responses:
 *       200:
 *         description: Order accepted
 */
router.post("/acceptOrder", checkUserAuth, UserController.acceptOrder);

/**
 * @swagger
 * /api/v1/deliveryPartner/orderDetails/{id}:
 *   get:
 *     summary: Get order details
 *     tags: [Delivery Partner]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details fetched
 */
router.get("/orderDetails/:id", checkUserAuth, UserController.getOrderDetails);

/**
 * @swagger
 * /api/v1/deliveryPartner/reports/orderHistory:
 *   get:
 *     summary: Get order history for delivery partner
 *     tags: [Delivery Partner Reports]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders from this date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders until this date (YYYY-MM-DD)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status (e.g., Delivered, Accepted, Pending)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: ORDT
 *         description: Column to sort by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: DESC
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Order history fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                     summary:
 *                       type: object
 *                       properties:
 *                         totalOrders:
 *                           type: integer
 *                         statusBreakdown:
 *                           type: object
 *                         totalEarnings:
 *                           type: string
 *                         completedOrders:
 *                           type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/reports/orderHistory", checkUserAuth, ReportController.getOrderHistory);

/**
 * @swagger
 * /api/v1/deliveryPartner/reports/orderDetail/{orderId}:
 *   get:
 *     summary: Get detailed report for a specific order
 *     tags: [Delivery Partner Reports]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order detail report fetched successfully
 *       403:
 *         description: Unauthorized - Order does not belong to this partner
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/reports/orderDetail/:orderId", checkUserAuth, ReportController.getOrderDetailReport);

/**
 * @swagger
 * /api/v1/deliveryPartner/reports/earnings:
 *   get:
 *     summary: Get earnings report for delivery partner
 *     tags: [Delivery Partner Reports]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [daily, weekly, monthly]
 *           default: monthly
 *         description: Period for earnings breakdown
 *       - in: query
 *         name: year
 *         schema:
 *           type: integer
 *           default: 2026
 *         description: Year for the report
 *     responses:
 *       200:
 *         description: Earnings report fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     period:
 *                       type: string
 *                     year:
 *                       type: integer
 *                     breakdown:
 *                       type: array
 *                     summary:
 *                       type: object
 *                       properties:
 *                         totalEarnings:
 *                           type: string
 *                         totalOrders:
 *                           type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/reports/earnings", checkUserAuth, ReportController.getEarningsReport);

/**
 * @swagger
 * /api/v1/deliveryPartner/reports/summary:
 *   get:
 *     summary: Get order summary/stats for delivery partner dashboard
 *     tags: [Delivery Partner Reports]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Order summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     totalOrders:
 *                       type: integer
 *                     statusBreakdown:
 *                       type: object
 *                     totalEarnings:
 *                       type: string
 *                     completedOrders:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/reports/summary", checkUserAuth, ReportController.getOrderSummary);

/**
 * @swagger
 * /api/v1/deliveryPartner/reports/export:
 *   get:
 *     summary: Export order history data (prepared for PDF generation)
 *     tags: [Delivery Partner Reports]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders from this date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter orders until this date (YYYY-MM-DD)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status
 *     responses:
 *       200:
 *         description: Order history export data prepared successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                 result:
 *                   type: object
 *                   properties:
 *                     partner:
 *                       type: object
 *                     reportDate:
 *                       type: string
 *                     filterCriteria:
 *                       type: object
 *                     orders:
 *                       type: array
 *                     summary:
 *                       type: object
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.get("/reports/export", checkUserAuth, ReportController.exportOrderHistory);

// ==========================================
// Order Status Management Routes
// ==========================================

/**
 * @swagger
 * /api/v1/deliveryPartner/order-statuses:
 *   get:
 *     summary: Get all available order statuses
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Order statuses fetched successfully
 */
router.get("/order-statuses", checkUserAuth, OrderStatusController.getAllStatuses);

/**
 * @swagger
 * /api/v1/deliveryPartner/order/{orderId}/status:
 *   get:
 *     summary: Get current order status
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order status fetched successfully
 */
router.get("/order/:orderId/status", checkUserAuth, OrderStatusController.getOrderStatus);

/**
 * @swagger
 * /api/v1/deliveryPartner/order/{orderId}/allowed-transitions:
 *   get:
 *     summary: Get allowed status transitions for an order
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Allowed transitions fetched successfully
 */
router.get("/order/:orderId/allowed-transitions", checkUserAuth, OrderStatusController.getAllowedTransitions);

/**
 * @swagger
 * /api/v1/deliveryPartner/order/{orderId}/status:
 *   post:
 *     summary: Update order status
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "Order Picked"
 *     responses:
 *       200:
 *         description: Order status updated successfully
 */
router.post("/order/:orderId/status", checkUserAuth, OrderStatusController.updateOrderStatus);

/**
 * @swagger
 * /api/v1/deliveryPartner/order/{orderId}/pickup:
 *   post:
 *     summary: Mark order as picked up
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order marked as picked up
 */
router.post("/order/:orderId/pickup", checkUserAuth, OrderStatusController.markOrderPicked);

/**
 * @swagger
 * /api/v1/deliveryPartner/order/{orderId}/start-trip:
 *   post:
 *     summary: Start the trip
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Trip started successfully
 */
router.post("/order/:orderId/start-trip", checkUserAuth, OrderStatusController.startTrip);

/**
 * @swagger
 * /api/v1/deliveryPartner/order/{orderId}/deliver:
 *   post:
 *     summary: Mark order as delivered
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order marked as delivered
 */
router.post("/order/:orderId/deliver", checkUserAuth, OrderStatusController.markOrderDelivered);

/**
 * @swagger
 * /api/v1/deliveryPartner/order/{orderId}/resume:
 *   post:
 *     summary: Resume order after incident (Trip Aborted -> Trip Started)
 *     tags: [Order Status]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order resumed successfully
 */
router.post("/order/:orderId/resume", checkUserAuth, OrderStatusController.resumeOrder);

export default router;
