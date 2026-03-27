import express from "express";
import UserController from "../controllers/userController.js";
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

export default router;
