// write main business logic here using helper functions
import dotenv from "dotenv";
dotenv.config();
import sequelize from "../config/pgdbconfig.js";
import { AttachmentHelperFunctions } from "../repository/attachments.js";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";



class AttachmentService {

    static GetAttachment = (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { AttID } = req.query;
                if (!AttID) {
                    return reject({ status: 400, message: "AttID is required" });
                }
                const attachment = await AttachmentHelperFunctions.findOneAttachment({ AttID });
                if (!attachment) {
                    return reject({ status: 404, message: "Attachment not found" });
                }
                resolve(attachment);
            } catch (error) {
                reject(error);
            }
        });
    };

    static GetAllAttachments = (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const attachments = await AttachmentHelperFunctions.findAllAttachments(req.query);
                resolve(attachments);
            } catch (error) {
                reject(error);
            }
        });
    };


    static UploadAttachment = (req) => {
        return new Promise(async (resolve, reject) => {
            try {
                const file = req.file;
                if (!file) return reject("No file uploaded.");

                AWS.config.update({
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY,
                    region: process.env.AWS_BUCKET_REGION,
                });

                const s3 = new AWS.S3();
                const keyName = `${Date.now()}_${file.originalname}`;

                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: keyName,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };

                const s3Data = await s3.upload(params).promise();

                const attachmentPayload = {
                    AttID: uuidv4(),
                    AttURL: s3Data.Location,
                    CAt: new Date(),
                    UAt: new Date()
                };

                const attachment =
                    await AttachmentHelperFunctions.saveOrUpdateAttachment(
                        attachmentPayload
                    );
                resolve({
                    status: "success",
                    message: "Data Saved",
                    result: {
                        id: attachment.AttID,
                        url: attachment.AttURL
                    }
                });
            } catch (error) {
                reject({ status: 500, message: error.message || "Server Error" });
            }
        });
    };
}

export default AttachmentService
