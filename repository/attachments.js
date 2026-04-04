// Create database related operations for this microservice only
import db from "../config/database.js";
const { models, DestroyFromDataBase, SaveToDataBase, UpsertInDataBase } = db;

const { _attachments } = models;

/* ---------------- Save / Update ---------------- */
const saveOrUpdateAttachment = (data, t) => {
  return UpsertInDataBase({
    model: _attachments,
    fields: [
      "AttID",
      "AttURL",
      "CAt",
      "UAt"
    ],
    updateOnDuplicate: [
      "AttURL",
      "UAt"
    ],
    data,
    transaction: t
  });
};

/* ---------------- Delete ---------------- */
const deleteAttachment = (where, t) => {
  return DestroyFromDataBase({
    model: _attachments,
    where,
    transaction: t
  });
};

/* ---------------- Find One ---------------- */
const findOneAttachment = (where = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const attachment = await _attachments.findOne({ where });
      resolve(attachment);
    } catch (error) {
      reject(error);
    }
  });
};

/* ---------------- Find All ---------------- */
const findAllAttachments = (where = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = await _attachments.findAll({
        where,
        order: [["CAt", "DESC"]],
      });
      resolve(doc);
    } catch (error) {
      reject(error);
    }
  });
};

export const AttachmentHelperFunctions = {
  saveOrUpdateAttachment,
  deleteAttachment,
  findOneAttachment,
  findAllAttachments,
};