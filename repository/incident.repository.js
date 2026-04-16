import db from "../config/database.js";

const { models } = db;
const { _order_incidents, _order_incident_reasons, _orders } = models;

/**
 * Get latest incident for an order
 */
export const getLatestIncident = async (orderId) => {
  try {
    const incident = await _order_incidents.findOne({
      where: { ORID: orderId },
      include: [{ 
        model: _order_incident_reasons, 
        as: 'reason' 
      }],
      order: [['OIND', 'DESC']]  // Get the most recent incident
    });
    return incident;
  } catch (error) {
    console.error("❌ Error fetching latest incident:", error);
    throw error;
  }
};

/**
 * Get all incident reasons
 */
export const getIncidentReasons = async () => {
  try {
    const reasons = await _order_incident_reasons.findAll({
      order: [["OIRI", "ASC"]]
    });
    return reasons;
  } catch (error) {
    console.error("❌ Error fetching incident reasons:", error);
    throw error;
  }
};

/**
 * Create a new incident report and update order status to "Trip Aborted"
 */
export const createIncident = async (incidentData) => {
  const connection = await db.sequelize.transaction();
  
  try {
    // Generate unique ORIN (15 chars)
    const incidentId = `INC${Date.now().toString().slice(-12)}`;

    console.log("💾 Creating incident report:", {
      incidentId,
      ORID: incidentData.ORID,
      OIRI: incidentData.OIRI
    });

    // 1. Create incident record
    const incident = await _order_incidents.create({
      ORIN: incidentId,
      ORID: incidentData.ORID,
      OIND: incidentData.OIND || new Date(),
      OIDE: incidentData.OIDE || "",
      OIST: null,  // NULL instead of empty string (foreign key constraint)
      OIRC: null,  // NULL instead of empty string
      OICA: null,  // NULL instead of empty string
      OIPA: null,  // NULL instead of empty string
      OIRD: null,  // NULL instead of empty string
      OICD: null,  // NULL instead of empty string
      OIRI: incidentData.OIRI
    }, { transaction: connection });

    console.log("✅ Incident report created:", incidentId);

    // 2. Update order status to "Trip Aborted"
    console.log(`🔄 Updating order ${incidentData.ORID} status to "Trip Aborted"`);
    
    const [updatedRows] = await _orders.update(
      { ORST: "Trip Aborted" },
      { 
        where: { ORID: incidentData.ORID },
        transaction: connection 
      }
    );

    if (updatedRows === 0) {
      throw new Error(`Order ${incidentData.ORID} not found`);
    }

    console.log("✅ Order status updated to Trip Aborted");

    // Commit transaction
    await connection.commit();
    console.log("✅ Transaction committed successfully");

    // 3. Notify customer backend about status change
    try {
      const axios = (await import('axios')).default;
      
      // Fetch order details to get customer ID
      const order = await _orders.findOne({
        where: { ORID: incidentData.ORID },
        include: [{ model: _order_incidents, as: 'incidents' }]
      });

      if (order && order.CID) {
        const customerBackendUrl = process.env.CUSTOMER_BACKEND_URL || "http://localhost:5000";
        
        console.log(`📢 Notifying customer backend about status change...`);
        
        // Fire and forget - don't block the response
        axios.post(`${customerBackendUrl}/api/internal/customer/notify-status-update`, {
          customerId: order.CID,
          orderId: incidentData.ORID,
          status: "Trip Aborted",
          message: "Incident reported by delivery partner"
        }).catch(err => {
          console.error("⚠️ Failed to notify customer backend:", err.message);
        });
      }
    } catch (notifyError) {
      console.error("⚠️ Notification error:", notifyError.message);
      // Don't fail the incident report if notification fails
    }

    return {
      incident,
      orderStatusUpdated: true
    };
  } catch (error) {
    // Rollback transaction on error
    await connection.rollback();
    console.error("❌ Error creating incident:", error);
    throw error;
  }
};
