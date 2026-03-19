
import { DeliveryPartner } from "./deliveryPartner.js";
import { DeliveryPartnerDetails } from "./deliveryPartnerDetails.js";
import { DPLocation } from "./deliveryPartnerLocation.js";


const models = (sequelize, DataTypes) => {
  const _delivery_partner = DeliveryPartner(sequelize, DataTypes);
  const _delivery_partner_details = DeliveryPartnerDetails(sequelize, DataTypes);
  const _delivery_partner_location = DPLocation(sequelize, DataTypes);

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

  _delivery_partner_location.belongsTo(_delivery_partner, {
    foreignKey: "DPID",
    targetKey: "DPID",
    as: "partner",
  });

  return {
    _delivery_partner,
    _delivery_partner_details,
    _delivery_partner_location
  }
};

export { models };
