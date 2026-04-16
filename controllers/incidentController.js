import { getIncidentReasons, createIncident, getLatestIncident } from "../repository/incident.repository.js";
import { sendResult, sendError } from "../constant/HttpResponse.js";

/**
 * GET /api/v1/deliveryPartner/incidents/reasons
 * Get all incident reasons
 */
export const getIncidentReasonsController = async (req, res) => {
  try {
    console.log("📋 Fetching incident reasons...");
    
    const reasons = await getIncidentReasons();
    
    return sendResult({
      resCode: 200,
      res,
      result: reasons,
      message: "Incident reasons fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching incident reasons:", error);
    return sendError({
      errorCode: 500,
      res,
      error: error.message,
      message: "Failed to fetch incident reasons"
    });
  }
};

/**
 * GET /api/v1/deliveryPartner/incidents/:orderId/latest
 * Get latest incident for an order
 */
export const getLatestIncidentController = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log("🔍 Fetching latest incident for order:", orderId);
    
    const incident = await getLatestIncident(orderId);
    
    if (!incident) {
      return sendResult({
        resCode: 200,
        res,
        result: null,
        message: "No incidents found for this order"
      });
    }
    
    return sendResult({
      resCode: 200,
      res,
      result: incident,
      message: "Latest incident fetched successfully"
    });
  } catch (error) {
    console.error("❌ Error fetching latest incident:", error);
    return sendError({
      errorCode: 500,
      res,
      error: error.message,
      message: "Failed to fetch latest incident"
    });
  }
};

/**
 * POST /api/v1/deliveryPartner/incidents/report
 * Report a new incident
 */
export const reportIncidentController = async (req, res) => {
  try {
    const { orderId, reasonId, description } = req.body;
    const dpId = req.user?.DPID;

    console.log("📝 Report Incident - orderId:", orderId, "reasonId:", reasonId, "dpId:", dpId);

    if (!orderId || !reasonId || !description) {
      return sendError({
        errorCode: 400,
        res,
        error: "Missing required fields",
        message: "Order ID, Reason ID, and Description are required"
      });
    }

    if (!dpId) {
      return sendError({
        errorCode: 401,
        res,
        error: "Missing DPID in token",
        message: "Authentication error: Missing DPID"
      });
    }

    const incident = await createIncident({
      ORID: orderId,
      OIND: new Date(),
      OIDE: description,
      OIRI: reasonId
    });

    return sendResult({
      resCode: 201,
      res,
      result: incident,
      message: "Incident reported successfully. Order status updated to Trip Aborted."
    });
  } catch (error) {
    console.error("❌ Error reporting incident:", error);
    return sendError({
      errorCode: 500,
      res,
      error: error.message,
      message: "Failed to report incident: " + error.message
    });
  }
};
