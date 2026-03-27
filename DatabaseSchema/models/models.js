import { DeliveryPartner } from "./deliveryPartner.js";
import { DeliveryPartnerDetails } from "./deliveryPartnerDetails.js";
import { DPLocation } from "./deliveryPartnerLocation.js";
import { Orders } from "./orders.js";
import { OrderTrips } from "./orderTrips.js";
import { OrdTripLeg } from "./ordTripLeg.js";
import { Customers } from "./customers.js";

const models = (sequelize, DataTypes) => {
  const _delivery_partner = DeliveryPartner(sequelize, DataTypes);
  const _delivery_partner_details = DeliveryPartnerDetails(sequelize, DataTypes);
  const _delivery_partner_location = DPLocation(sequelize, DataTypes);

  const _orders = Orders(sequelize, DataTypes);
  const _order_trips = OrderTrips(sequelize, DataTypes);
  const _ord_trip_leg = OrdTripLeg(sequelize, DataTypes);
  const _customers = Customers(sequelize, DataTypes);

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

  return {
    _delivery_partner,
    _delivery_partner_details,
    _delivery_partner_location,
    _orders,
    _order_trips,
    _ord_trip_leg,
    _customers
  };
};

export { models };