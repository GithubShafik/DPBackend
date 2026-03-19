import db from "../config/database.js";
import dotenv from "dotenv";

dotenv.config();

const { sequelize, models } = db;
const { _delivery_partner, _delivery_partner_details , _delivery_partner_location } = models;

class DPServices 
{
  static async handleSaveOrUpdateDPLocation(req) {
  let t;

  try {
    const { DPID, DPOID, DPTID, DPSTA, DPCLL, DPCSP } = req.body;

    if (!DPID) throw new Error("DPID is required");

    t = await sequelize.transaction();

    const existingLocation = await _delivery_partner_location.findOne({
      where: { DPID },
    });

    if (!existingLocation) {

      const newLocation = await _delivery_partner_location.create(
        {
          DPID,
          DPOID,
          DPTID,
          DPSTA,
          DPCLL,
          DPCDT: new Date(),
          DPCSP,
        },
        { transaction: t }
      );

      await t.commit();

      return newLocation;
    } else {

      await _delivery_partner_location.update(
        {
          DPOID,
          DPTID,
          DPSTA,
          DPCLL,
          DPCDT: new Date(),
          DPCSP,
        },
        {
          where: { DPID },
          transaction: t,
        }
      );

      await t.commit();

      return await _delivery_partner_location.findOne({
        where: { DPID },
      });
    }
  } catch (error) {
    if (t) await t.rollback();
    throw error;
  }
}

}

export default DPServices;