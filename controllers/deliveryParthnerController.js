import { sendError, sendResult } from "../constant/HttpResponse.js";

import DPServices from "../services/DP.js";
import dotenv from "dotenv";
dotenv.config();

class DeliveryParthnerController {
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

}

export default DeliveryParthnerController;
