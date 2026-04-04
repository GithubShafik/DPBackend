import express from "express";
import UserController from "../controllers/userController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";
import passport from "passport";

const router = express.Router();

/**
 * @swagger
 * /api/v1/user/loginwithphone:
 *   post:
 *     summary: Login user using phone number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country_code
 *               - contact
 *             properties:
 *               country_code:
 *                 type: string
 *                 example: "+91"
 *               contact:
 *                 type: string
 *                 example: "9876543210"
 *     responses:
 *       200:
 *         description: OTP sent successfully
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
 *                   example: OTP sent successfully
 *                 result:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: country_code and contact are required
 *       500:
 *         description: Internal Server Error
 */
router.post("/loginwithphone", UserController.PhoneLogin);

/**
 * @swagger
 * /api/v1/user/verifyphone:
 *   post:
 *     summary: Verify phone number using OTP and generate tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country_code
 *               - contact
 *               - code
 *             properties:
 *               country_code:
 *                 type: string
 *                 example: "+91"
 *               contact:
 *                 type: string
 *                 example: "9876543210"
 *               code:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: Login successful
 *                 result:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         DPID:
 *                           type: string
 *                         DPRMN:
 *                           type: string
 *                         DPRNC:
 *                           type: string
 *                         DPFN:
 *                           type: string
 *                         DPSTAT:
 *                           type: integer
 *                     refreshToken:
 *                       type: string
 *                     accessToken:
 *                       type: string
 *                     isNewUser:
 *                       type: boolean
 *       400:
 *         description: Invalid or expired OTP
 *       500:
 *         description: Internal Server Error
 */
router.post("/verifyphone", UserController.VerifyPhoneLogin);

/**
 * @swagger
 * /api/v1/user/verifyPhoneOnly:
 *   post:
 *     summary: Verify phone number using OTP (No login generated)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - country_code
 *               - contact
 *               - code
 *             properties:
 *               country_code:
 *                 type: string
 *                 example: "+91"
 *               contact:
 *                 type: string
 *                 example: "9876543210"
 *               code:
 *                 type: string
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: OTP verified successfully
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
 *                   example: OTP verified successfully
 *                 result:
 *                   type: string
 *                   example: OTP verified
 *       400:
 *         description: Invalid OTP or bad request
 *       500:
 *         description: Internal Server Error
 */
router.post("/verifyPhoneOnly", UserController.VerifyPhone);

/**
 * @swagger
 * /api/v1/user/getaccesstoken:
 *   post:
 *     summary: Get new access token using refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       201:
 *         description: Access Token Refreshed Successfully
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
 *                   example: Access Token Refreshed Successfully
 *                 result:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       401:
 *         description: UnAuthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/getaccesstoken", UserController.getAccessToken);

/**
 * @swagger
 * /api/v1/user/update_profile:
 *   post:
 *     summary: Update delivery partner profile
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - DPID
 *             properties:
 *               DPID:
 *                 type: string
 *               DPFN:
 *                 type: string
 *               DPMN:
 *                 type: string
 *               DPLN:
 *                 type: string
 *               DPDN:
 *                 type: string
 *               DPTL:
 *                 type: string
 *               DPADL1:
 *                 type: string
 *               DPADL2:
 *                 type: string
 *               DPADLM:
 *                 type: string
 *               DPADCT:
 *                 type: string
 *               DPADST:
 *                 type: string
 *               DPADC:
 *                 type: string
 *               DPADZ:
 *                 type: string
 *               DPSTAT:
 *                 type: integer
 *               DPDOB:
 *                 type: string
 *                 format: date
 *               DPANN:
 *                 type: string
 *                 format: date
 *               DPSPOU:
 *                 type: string
 *               DPCHIL1:
 *                 type: string
 *               DPCHIL2:
 *                 type: string
 *               DPSPIN:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input or DPID required
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Partner not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/update_profile", checkUserAuth, UserController.updateUserProfile);

/**
 * @swagger
 * /api/v1/user/register:
 *   post:
 *     summary: Register delivery partner
 *     description: Register a new delivery partner and save details in DeliveryPartner and DeliveryPartnerDetails tables.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - DPID
 *             properties:
 *               DPID:
 *                 type: string
 *                 description: Delivery Partner ID
 *                 example: "DP12345678"
 *               DPFN:
 *                 type: string
 *                 description: First Name
 *               DPMN:
 *                 type: string
 *                 description: Middle Name
 *               DPLN:
 *                 type: string
 *                 description: Last Name
 *               DPDN:
 *                 type: string
 *                 description: Display Name
 *               DPTL:
 *                 type: string
 *                 description: Title
 *               DPADL1:
 *                 type: string
 *                 description: Address Line 1
 *               DPADL2:
 *                 type: string
 *                 description: Address Line 2
 *               DPADLM:
 *                 type: string
 *                 description: Address Landmark
 *               DPADCT:
 *                 type: string
 *                 description: City
 *               DPADST:
 *                 type: string
 *                 description: State
 *               DPADC:
 *                 type: string
 *                 description: Country
 *               DPADZ:
 *                 type: string
 *                 description: Zip/Pincode
 *               DPDOB:
 *                 type: string
 *                 format: date
 *                 description: Date of Birth
 *               DPSPIN:
 *                 type: string
 *                 description: ID Proof details (JSON string)
 *               DPAO:
 *                 type: string
 *                 description: Application Origin
 *               DPAL:
 *                 type: string
 *                 description: Application Link/Details
 *               DPAS:
 *                 type: boolean
 *                 description: Application Status
 *     responses:
 *       201:
 *         description: Registration successful
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
 *                   example: Registration successful
 *                 result:
 *                   type: object
 *       400:
 *         description: DPID is required
 *       404:
 *         description: Delivery partner not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", UserController.RegisterPartner);

/**
 * @swagger
 * /api/v1/user/tnc:
 *   get:
 *     summary: Get Terms & Conditions
 *     description: Fetch Terms and Conditions for Customer, Delivery Partner, Privacy and Security from PDTnC table.
 *     tags: [Terms & Conditions]
 *     responses:
 *       200:
 *         description: Terms & Conditions fetched successfully
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
 *                   example: Terms & Conditions fetched successfully
 *                 result:
 *                   type: object
 *                   properties:
 *                     TCCU:
 *                       type: string
 *                       description: Customer Terms & Conditions
 *                       example: "Customer terms content..."
 *                     TCDP:
 *                       type: string
 *                       description: Delivery Partner Terms & Conditions
 *                       example: "Delivery partner terms..."
 *                     TCPG:
 *                       type: string
 *                       description: Privacy Policy
 *                       example: "Privacy policy content..."
 *                     TCSC:
 *                       type: string
 *                       description: Security Clause
 *                       example: "Security terms..."
 *       500:
 *         description: Failed to fetch Terms & Conditions
 */
router.get("/tnc", UserController.getTermsAndConditions);

export default router;
