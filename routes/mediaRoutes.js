import express from "express";
import multer from "multer";
import AttachmentController from "../controllers/AttachmentController.js";
const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ storage: memoryStorage });



const router = express.Router();
/**
 * @swagger
 * /api/v1/attachment/uploads:
 *   post:
 *     summary: Upload an attachment
 *     tags:
 *       - Attachment
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Attachment file to upload
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: Attachment uploaded successfully
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
 *                   example: Data Saved
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: 38f6c91f-0e46-4779-9e67-814356dec240
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *                     file_name:
 *                       type: string
 *                       example: Steps To Create Facebook Auth (1).pdf
 *                     file_type:
 *                       type: string
 *                       example: application/pdf
 *                     source_type:
 *                       type: string
 *                       example: s3
 *                     external_url:
 *                       type: string
 *                       format: uri
 *                       example: https://ivolveai-bucket.s3.ap-south-1.amazonaws.com/...
 *                     file_extension:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     file_content:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Validation or duplicate constraint error
 *       500:
 *         description: Internal server error
 */
router.post("/uploads",memoryUpload.single("file") ,AttachmentController.uploadAttachmentS3);

/**
 * @swagger
 * /api/v1/attachment/attachmentById:
 *   get:
 *     summary: Get attachment details by AttID
 *     tags:
 *       - Attachment
 *     parameters:
 *       - in: query
 *         name: AttID
 *         required: true
 *         schema:
 *           type: string
 *         description: The attachment ID (UUID)
 *     responses:
 *       200:
 *         description: Attachment retrieved successfully
 *       400:
 *         description: AttID is required
 *       404:
 *         description: Attachment not found
 *       500:
 *         description: Internal server error
 */

router.get("/attachmentById", AttachmentController.getAttachment);

/**
 * @swagger
 * /api/v1/attachment/attachments:
 *   get:
 *     summary: Get all advertisement listings
 *     tags:
 *       - Attachment
 *     responses:
 *       200:
 *         description: Ads fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: guid
 *                       title_en:
 *                         type: string
 *                       title_ar:
 *                         type: string
 *                       description_en:
 *                         type: string
 *                       description_ar:
 *                         type: string
 *                       price:
 *                         type: number
 *                       currency:
 *                         type: string
 *                       negotiable:
 *                         type: boolean
 *                       sub_category_id:
 *                         type: integer
 *                       location_id:
 *                         type: integer
 *                       user_id:
 *                         type: integer
 *                       status_code:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *       500:
 *         description: Internal server error
 */
router.get("/attachments", AttachmentController.getAllAttachments);

export default router; 