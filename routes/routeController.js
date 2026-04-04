import { Router } from "express";
import * as appRoutes from "./routeImports.js";

const router = Router();

const setRoutes = () => {
  router.use("/api/v1/user", appRoutes.userRoutes);
  router.use("/api/v1/deliveryPartner", appRoutes.deliveryPartnerRoutes);
  router.use("/api/v1/attachment", appRoutes.attachmentRoutes);
    return router;
};

export default setRoutes;
