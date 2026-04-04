// add basic validation for req.body and query params then pass the values to service layer

import { sendError, sendResult } from "../constant/HttpResponse.js";
import AttachmentService from "../services/attachment.js";



class AttachmentController {
  static uploadAttachmentS3 = async (req, res) => {
    try {
      const response = await AttachmentService.UploadAttachment(req);
      return sendResult({res, result: response, message: "Data Saved"});
    } catch (error) {
      console.error("❌ Attachment Error:", error); 
      if (error?.name === "SequelizeUniqueConstraintError") {
        return sendError({resCode:400, res, error: error});
      }
      if (error?.status) {
      return sendError({resCode:error.status, res, error: error, message: error.message,});
      }
      return sendError({resCode:500, res, error: error?.message, message: "Internal server error",});
    }
  };

  static getAllAttachments = async (req, res) => {
    try {
      const response = await AttachmentService.GetAllAttachments(req);
      return sendResult({res, result:response, message: "Data Retrived"});
    } catch (error) {
      console.error("❌ Attachment Error:", error); 
      if (error?.name === "SequelizeUniqueConstraintError") {
        return sendError({errorCode:400, res, error: error});
      }
      if (error?.status) {
      return sendError({errorCode:error?.status, res, error: error, message: error.message,});
      }
      return sendError({errorCode:500, res, error: error?.message, message: "Internal server error",});
    }
  };

  static getAttachment = async (req, res) => {
    try {
      const response = await AttachmentService.GetAttachment(req);
      return sendResult({res,result:response, message: "Data Retrived"});
    } catch (error) {
      console.error("❌ Attachment Error::", error); 
      if (error?.name === "SequelizeUniqueConstraintError") {
        return sendError({errorCode:400, res, error: error});
      }
      if (error?.status) {
      return sendError({errorCode:error?.status, res, error: error, message: error.message,});
      }
      return sendError({errorCode:500, res, error: error?.message, message: "Internal server error",});
    }
  };
}; 

export default AttachmentController;
