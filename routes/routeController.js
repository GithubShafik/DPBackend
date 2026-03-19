import { Router } from "express";
import * as appRoutes from "./routeImports.js";

const router = Router();

const setRoutes = () => {
  router.use("/api/v1/user", appRoutes.userRoutes);
  router.use("/api/v1/deliveryPartner", appRoutes.deliveryPartnerRoutes);
    return router;
};

export default setRoutes;
