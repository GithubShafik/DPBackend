import db from "../config/database.js";
import dotenv from "dotenv";
 
dotenv.config();
 
const { sequelize, models } = db;
const { _delivery_partner, _delivery_partner_details, _delivery_partner_location, _pd_tnc } = models;
 
class DPServices {
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
 
        // Only update location-related fields; do NOT overwrite DPOID/DPTID
        // DPOID is managed by handleAcceptOrder (set) and orderStatusService (clear)
        const updateData = {
          DPSTA,
          DPCLL,
          DPCDT: new Date(),
          DPCSP,
        };

        await _delivery_partner_location.update(
          updateData,
          {
            where: { DPID },
            transaction: t,
          }
        );
 
        await t.commit();

        const updatedLocation = await _delivery_partner_location.findOne({
          where: { DPID },
        });

        // Forward live location to Customer Backend if attached to an order
        if (updatedLocation && updatedLocation.DPOID) {
          try {
            const customerBackendUrl = process.env.CUSTOMER_BACKEND_URL || "http://localhost:5000";
            const [lat, lng] = DPCLL.split(",");
            const axios = await import("axios");
            axios.default.post(`${customerBackendUrl}/api/internal/customer/notify-location`, {
               orderId: updatedLocation.DPOID,
               latitude: parseFloat(lat),
               longitude: parseFloat(lng)
            }).catch(e => console.error("[Location Forward] ❌ error:", e.message));
          } catch(err) {
            console.error("[Location Forward] ❌ exception:", err.message);
          }
        }

        return updatedLocation;
      }
    } catch (error) {
      if (t) await t.rollback();
      throw error;
    }
  }
 
  static async handleAcceptOrder(req) {
    let t;
    try {
      const { orderId } = req.body;
      const dpId = req.user.DPID;   // ✅ get from JWT
 
      if (!orderId) throw new Error("Order ID is required");
 
      console.log('🔍 Available Models:', Object.keys(models));
      const { _orders, _order_trips, _ord_trip_leg } = models;
 
      if (!_orders || !_order_trips || !_ord_trip_leg) {
        throw new Error(`Missing required models: ${_orders ? '' : '_orders '}${_order_trips ? '' : '_order_trips '}${_ord_trip_leg ? '' : '_ord_trip_leg'}`);
      }
 
      t = await sequelize.transaction();
 
      console.log(`📦 Attempting to accept Order: ${orderId} for Partner: ${dpId}`);
 
      // First check if order exists and is not already accepted
      const existingOrder = await _orders.findOne({
        where: { ORID: orderId },
        transaction: t
      });
 
      if (!existingOrder) {
        throw new Error("Order not found");
      }
 
      if (existingOrder.DPID) {
        throw new Error("Order already accepted by another partner");
      }
 
      if (existingOrder.ORST === "Order Cancelled") {
        throw new Error("You can't accept this order because it is cancelled by user");
      }
 
      // Update order status and assign delivery partner
      const [updatedRows] = await _orders.update(
        {
          ORST: "Pickup Confirmed",  // Status 2: Matches OrderStatus table
          DPID: dpId
        },
        {
          where: {
            ORID: orderId
          },
          transaction: t
        }
      );
 
      if (updatedRows === 0) {
        throw new Error("Failed to update order");
      }
 
      const trip = await _order_trips.findOne({
        where: { ORID: orderId },
        transaction: t
      });
 
      if (!trip) {
        throw new Error("Order trip not found");
      }
 
      await _ord_trip_leg.create(
        {
          OTLID: `OTL${Date.now().toString().slice(-8)}`,
          OTID: trip.OTID,
          ORID: orderId,
          DPID: dpId,
          OTLDT: new Date(),
          OTLLL: "",
        },
        { transaction: t }
      );
 
      await t.commit();
 
      // Update DPLocation: assign order ID to mark DP as busy
      try {
        if (!dpId) {
          console.warn('⚠️ No DPID found for location update, skipping');
        } else {
          // We want to mark the partner as busy with the order ID and trip ID
          const updateData = {
            DPOID: orderId,
            DPTID: trip ? trip.OTID : null
          };
 
          // Optional: set current location if provided
          if (req.body.latitude && req.body.longitude) {
            updateData.DPCLL = `${req.body.latitude},${req.body.longitude}`;
            updateData.DPCDT = new Date();
          }
 
          console.log(`📍 Updating DPLocation for DPID=${dpId} with:`, updateData);
          const { _delivery_partner_location } = models;
 
          if (_delivery_partner_location) {
            await _delivery_partner_location.update(updateData, { where: { DPID: dpId } });
            console.log(`✅ DPLocation update successful for DPID=${dpId}`);
          } else {
            console.warn('⚠️ _delivery_partner_location model NOT FOUND in models');
          }
        }
      } catch (locError) {
        console.error('⚠️ Failed to update DPLocation on accept:', locError.message);
      }
 
      return { success: true, orderId, dpId };
 
    } catch (error) {
      console.error('❌ acceptOrder service error:', error.message);
      if (t && !t.finished) {
        try {
          await t.rollback();
          console.log('🔄 Transaction rolled back');
        } catch (rollbackErr) {
          console.error('⚠️ Failed to rollback transaction:', rollbackErr.message);
        }
      }
      throw error;
    }
  }
 
  static async handleGetOrderDetails(req) {
    try {
      const { id } = req.params;
      const { _orders, _customers, _order_trips } = models;
 
      console.log("🔍 Fetching order details for:", id);
 
      const order = await _orders.findOne({
        where: { ORID: id },
        include: [
          { model: _customers, as: "customer" }, // Uses CID
          { model: _order_trips, as: "trips" }
        ]
      });
 
      if (!order) {
        console.error("❌ Order not found:", id);
        throw new Error("Order not found");
      }
 
      console.log("✅ Order found with details:", {
        ORID: order.ORID,
        ORST: order.ORST,
        DPID: order.DPID,
        ORCD: order.ORCD,
        CID: order.CID,
        hasCustomer: !!order.customer,
        hasTrips: !!order.trips?.length
      });
 
      // If customer not found via CID association, try manual lookup
      let customerData = order.customer;
 
      if (!customerData) {
        console.log("⚠️ No customer via association, trying manual lookup...");
        console.log("🔍 Looking for customer with CID =", order.CID);
        console.log("🔍 Or fallback to ORCD =", order.ORCD);
 
        // Try finding by CID first
        customerData = await _customers.findOne({
          where: { CID: order.CID }
        });
 
        // If still not found, try ORCD
        if (!customerData && order.ORCD) {
          console.log("⚠️ Customer not found by CID, trying ORCD...");
          customerData = await _customers.findOne({
            where: { CID: order.ORCD }
          });
        }
 
        if (customerData) {
          console.log("✅ Found customer manually:", {
            CID: customerData.CID,
            CFN: customerData.CFN,
            CLN: customerData.CLN,
            CDN: customerData.CDN
          });
        } else {
          console.error("❌ Customer NOT found in database!");
          console.error("❌ Searched for CID:", order.CID, "and ORCD:", order.ORCD);
 
          // Check if customer exists in database at all
          const allCustomers = await _customers.findAll({
            attributes: ['CID', 'CFN', 'CLN', 'CDN']
          });
          console.log("📋 All customers in database:", allCustomers.map(c => c.toJSON()));
        }
      }
 
      // Return order with customer data attached
      const result = order.toJSON();
      result.customer = customerData ? customerData.toJSON() : null;
 
      return result;
    } catch (error) {
      console.error("❌ GetOrderDetails Error:", error);
      throw error;
    }
  }
 
  static async handleGetTermsAndConditions(req) {
    try {
      const { _pd_tnc } = models;
 
      const data = await _pd_tnc.findOne();
 
      if (!data) {
        throw new Error("Terms & Conditions not found");
      }
 
      return data;
    } catch (error) {
      console.error("❌ handleGetTermsAndConditions Error:", error);
      throw error;
    }
  }
}
 
export default DPServices;
 