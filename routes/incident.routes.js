import express from "express";
import { getIncidentReasonsController, getLatestIncidentController, reportIncidentController } from "../controllers/incidentController.js";
import checkUserAuth from "../middlewares/auth-middleware.js";

const router = express.Router();

// Protected routes (require authentication)
router.get("/reasons", checkUserAuth, getIncidentReasonsController);
router.get("/:orderId/latest", checkUserAuth, getLatestIncidentController);
router.post("/report", checkUserAuth, reportIncidentController);

export default router;
