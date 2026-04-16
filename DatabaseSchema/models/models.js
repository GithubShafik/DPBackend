import { DeliveryPartner } from "./deliveryPartner.js";
import { DeliveryPartnerDetails } from "./deliveryPartnerDetails.js";
import { DPLocation } from "./deliveryPartnerLocation.js";
import { Orders } from "./orders.js";
import { OrderTrips } from "./orderTrips.js";
import { OrdTripLeg } from "./ordTripLeg.js";
import { Customers } from "./customers.js";
import { PDTnC } from "./termsAndConditions.js";
import { Attachments } from "./attachments.js";
import { OrderStatus } from "./orderStatus.js";
import { OrderIncidents } from "./orderIncidents.js";
import { OrderIncidentReasons } from "./orderIncidentReasons.js";

const models = (sequelize, DataTypes) => {
  const _delivery_partner = DeliveryPartner(sequelize, DataTypes);
  const _delivery_partner_details = DeliveryPartnerDetails(sequelize, DataTypes);
  const _delivery_partner_location = DPLocation(sequelize, DataTypes);
  const _attachments = Attachments(sequelize, DataTypes);
  const _pd_tnc = PDTnC(sequelize, DataTypes);
  const _orders = Orders(sequelize, DataTypes);
  const _order_trips = OrderTrips(sequelize, DataTypes);
  const _ord_trip_leg = OrdTripLeg(sequelize, DataTypes);
  const _customers = Customers(sequelize, DataTypes);
  const _order_status = OrderStatus(sequelize, DataTypes);
  const _order_incidents = OrderIncidents(sequelize, DataTypes);
  const _order_incident_reasons = OrderIncidentReasons(sequelize, DataTypes);

  /* ---------------- Delivery Partner ---------------- */
  _delivery_partner.hasMany(_delivery_partner_details, {
    foreignKey: "DPID",
    sourceKey: "DPID",
    as: "details",
  });

  _delivery_partner_details.belongsTo(_delivery_partner, {
    foreignKey: "DPID",
    targetKey: "DPID",
    as: "partner",
  });

  // latest live location
  _delivery_partner.hasOne(_delivery_partner_location, {
    foreignKey: "DPID",
    sourceKey: "DPID",
    as: "liveLocation",
  });

  _delivery_partner_location.belongsTo(_delivery_partner, {
    foreignKey: "DPID",
    targetKey: "DPID",
    as: "partner",
  });

  /* ---------------- Customers -> Orders ---------------- */
  _customers.hasMany(_orders, {
    foreignKey: "CID",
    sourceKey: "CID",
    as: "orders",
  });

  _orders.belongsTo(_customers, {
    foreignKey: "CID",
    targetKey: "CID",
    as: "customer",
  });

  /* ---------------- Orders -> Status ---------------- */
  _order_status.hasMany(_orders, {
    foreignKey: "ORST",
    sourceKey: "STAT",
    as: "orders",
  });

  _orders.belongsTo(_order_status, {
    foreignKey: "ORST",
    targetKey: "STAT",
    as: "status",
  });

  // Also support ORCD for backward compatibility
  _orders.belongsTo(_customers, {
    foreignKey: "ORCD",
    targetKey: "CID",
    as: "customerByORCD",
  });

  /* ---------------- Orders -> Trips ---------------- */
  _orders.hasMany(_order_trips, {
    foreignKey: "ORID",
    sourceKey: "ORID",
    as: "trips",
  });

  _order_trips.belongsTo(_orders, {
    foreignKey: "ORID",
    targetKey: "ORID",
    as: "order",
  });

  /* ---------------- Trips -> Tracking History ---------------- */
  _order_trips.hasMany(_ord_trip_leg, {
    foreignKey: "OTID",
    sourceKey: "OTID",
    as: "tracking",
  });

  _ord_trip_leg.belongsTo(_order_trips, {
    foreignKey: "OTID",
    targetKey: "OTID",
    as: "trip",
  });

  /* ---------------- Order -> Tracking History ---------------- */
  _orders.hasMany(_ord_trip_leg, {
    foreignKey: "ORID",
    sourceKey: "ORID",
    as: "trackingHistory",
  });

  _ord_trip_leg.belongsTo(_orders, {
    foreignKey: "ORID",
    targetKey: "ORID",
    as: "order",
  });

  /* ---------------- Tracking -> Delivery Partner ---------------- */
  _delivery_partner.hasMany(_ord_trip_leg, {
    foreignKey: "DPID",
    sourceKey: "DPID",
    as: "trackingLogs",
  });

  _ord_trip_leg.belongsTo(_delivery_partner, {
    foreignKey: "DPID",
    targetKey: "DPID",
    as: "deliveryPartner",
  });

  /* ---------------- Attachments ---------------- */

  // Orders -> Attachment
  _orders.belongsTo(_attachments, {
    foreignKey: "AttID",
    targetKey: "AttID",
    as: "attachment",
  });

  _attachments.hasMany(_orders, {
    foreignKey: "AttID",
    sourceKey: "AttID",
    as: "orderAttachments",
  });

  // Delivery Partner -> Attachment
  _delivery_partner.belongsTo(_attachments, {
    foreignKey: "AttID",
    targetKey: "AttID",
    as: "attachment",
  });

  _attachments.hasMany(_delivery_partner, {
    foreignKey: "AttID",
    sourceKey: "AttID",
    as: "deliveryPartnerAttachments",
  });

  // Delivery Partner Details -> Attachment
  _delivery_partner_details.belongsTo(_attachments, {
    foreignKey: "AttID",
    targetKey: "AttID",
    as: "attachment",
  });

  _attachments.hasMany(_delivery_partner_details, {
    foreignKey: "AttID",
    sourceKey: "AttID",
    as: "deliveryPartnerDetailAttachments",
  });
  /* ---------------- Orders -> Incidents ---------------- */
  _orders.hasMany(_order_incidents, {
    foreignKey: "ORID",
    sourceKey: "ORID",
    as: "incidents",
  });

  _order_incidents.belongsTo(_orders, {
    foreignKey: "ORID",
    targetKey: "ORID",
    as: "order",
  });

  /* ---------------- Incident Reason ---------------- */
  _order_incident_reasons.hasMany(_order_incidents, {
    foreignKey: "OIRI",
    sourceKey: "OIRI",
    as: "incidents",
  });

  _order_incidents.belongsTo(_order_incident_reasons, {
    foreignKey: "OIRI",
    targetKey: "OIRI",
    as: "reason",
  });

  return {
    _delivery_partner,
    _delivery_partner_details,
    _delivery_partner_location,
    _orders,
    _order_trips,
    _ord_trip_leg,
    _customers,
    _pd_tnc,
    _attachments,
    _order_incidents,
    _order_incident_reasons,
  };
};

export { models };