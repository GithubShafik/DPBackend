import db from "../config/database.js";

const { models, DestroyFromDataBase, SaveToDataBase, UpsertInDataBase } = db;
const { _delivery_partner } = models;


/* CREATE */
const saveDeliveryPartner = (data) => {
  return SaveToDataBase({
    model: _delivery_partner,
    data,
  });
};


/* UPSERT (CREATE OR UPDATE) */
const saveOrUpdateDeliveryPartner = (data, t) => {
  return UpsertInDataBase({
    model: _delivery_partner,
    fields: [
      "DPID",
      "DPFN",
      "DPMN",
      "DPLN",
      "DPDN",
      "DPTL",
      "DPADL1",
      "DPADL2",
      "DPADLM",
      "DPADCT",
      "DPADST",
      "DPADC",
      "DPADZ",
      "DPSTAT",
      "DPDOB",
      "DPANN",
      "DPSPOU",
      "DPCHIL1",
      "DPCHIL2",
      "DPSPIN",
      "DPRMN",
      "DPRNC"
    ],
    updateOnDuplicate: [
      "DPFN",
      "DPMN",
      "DPLN",
      "DPDN",
      "DPTL",
      "DPADL1",
      "DPADL2",
      "DPADLM",
      "DPADCT",
      "DPADST",
      "DPADC",
      "DPADZ",
      "DPSTAT",
      "DPDOB",
      "DPANN",
      "DPSPOU",
      "DPCHIL1",
      "DPCHIL2",
      "DPSPIN",
      "DPRMN",
      "DPRNC"
    ],
    data,
    transaction: t,
  });
};


/* DELETE */
const deleteDeliveryPartner = (where, t) => {
  return DestroyFromDataBase({
    model: _delivery_partner,
    where,
    transaction: t,
  });
};


/* FIND ONE */
const findOneDeliveryPartner = (where = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await _delivery_partner.findOne({ where });
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};


/* FIND ALL */
const findAllDeliveryPartners = (where = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await _delivery_partner.findAll({ where });
      resolve(users);
    } catch (error) {
      reject(error);
    }
  });
};


export const DeliveryPartnerHelperFunctions = {
  saveDeliveryPartner,
  saveOrUpdateDeliveryPartner,
  deleteDeliveryPartner,
  findOneDeliveryPartner,
  findAllDeliveryPartners,
};