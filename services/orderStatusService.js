/**
 * Order Status Management Service
 * Manages order status transitions based on the OrderStatus lookup table
 */

import db from '../config/database.js';
import axios from 'axios';

const { sequelize, models } = db;
const { _orders, _order_status, _order_trips, _customers } = models;

// Order Status Constants
export const ORDER_STATUS = {
  ORDER_PLACED: 'Order Placed',
  PICKUP_CONFIRMED: 'Pickup Confirmed',
  PICKUP_CANCELLED: 'Pickup Cancelled',
  ORDER_CANCELLED: 'Order Cancelled',
  ORDER_PICKED: 'Order Picked',
  TRIP_STARTED: 'Trip Started',
  ORDER_DELIVERED: 'Order Delivered',
  ORDER_CLOSED: 'Order Closed',
  ORDER_DELIVERY_INCOMPLETE: 'Order Delivery Incomplete',
  ORDER_DELIVERY_FAILED: 'Order Delivery Failed',
  TRIP_ABORTED: 'Trip Aborted',
  TRIP_CANCELLED: 'Trip Cancelled',
  TRIP_2_STARTED: 'Trip 2 Started',
  TRIP_3_STARTED: 'Trip 3 Started',
  TRIP_4_STARTED: 'Trip 4 Started',
  TRIP_5_STARTED: 'Trip 5 Started',
  TRIP_6_STARTED: 'Trip 6 Started',
  ORDER_DELIVERED_1: 'Order Delivered 1',
  ORDER_DELIVERED_2: 'Order Delivered 2',
  ORDER_DELIVERED_3: 'Order Delivered 3',
  ORDER_DELIVERED_4: 'Order Delivered 4',
  ORDER_DELIVERED_5: 'Order Delivered 5',
  ACCEPTED: 'Accepted' // Legacy status, will be mapped to Pickup Confirmed
};

// Valid status transitions
const VALID_TRANSITIONS = {
  [ORDER_STATUS.ORDER_PLACED]: [
    ORDER_STATUS.PICKUP_CONFIRMED,
    ORDER_STATUS.ORDER_CANCELLED
  ],
  [ORDER_STATUS.PICKUP_CONFIRMED]: [
    ORDER_STATUS.ORDER_PICKED,
    ORDER_STATUS.PICKUP_CANCELLED,
    ORDER_STATUS.ORDER_CANCELLED
  ],
  [ORDER_STATUS.ORDER_PICKED]: [
    ORDER_STATUS.TRIP_STARTED,
    ORDER_STATUS.ORDER_DELIVERY_INCOMPLETE
  ],
  [ORDER_STATUS.TRIP_STARTED]: [
    ORDER_STATUS.ORDER_DELIVERED,
    ORDER_STATUS.ORDER_DELIVERED_1,
    ORDER_STATUS.TRIP_ABORTED
  ],
  [ORDER_STATUS.ORDER_DELIVERED_1]: [
    ORDER_STATUS.TRIP_2_STARTED,
    ORDER_STATUS.ORDER_CLOSED
  ],
  [ORDER_STATUS.TRIP_2_STARTED]: [
    ORDER_STATUS.ORDER_DELIVERED,
    ORDER_STATUS.ORDER_DELIVERED_2,
    ORDER_STATUS.TRIP_ABORTED
  ],
  [ORDER_STATUS.ORDER_DELIVERED_2]: [
    ORDER_STATUS.TRIP_3_STARTED,
    ORDER_STATUS.ORDER_CLOSED
  ],
  [ORDER_STATUS.TRIP_3_STARTED]: [
    ORDER_STATUS.ORDER_DELIVERED,
    ORDER_STATUS.ORDER_DELIVERED_3,
    ORDER_STATUS.TRIP_ABORTED
  ],
  [ORDER_STATUS.ORDER_DELIVERED_3]: [
    ORDER_STATUS.TRIP_4_STARTED,
    ORDER_STATUS.ORDER_CLOSED
  ],
  [ORDER_STATUS.TRIP_4_STARTED]: [
    ORDER_STATUS.ORDER_DELIVERED,
    ORDER_STATUS.ORDER_DELIVERED_4,
    ORDER_STATUS.TRIP_ABORTED
  ],
  [ORDER_STATUS.ORDER_DELIVERED_4]: [
    ORDER_STATUS.TRIP_5_STARTED,
    ORDER_STATUS.ORDER_CLOSED
  ],
  [ORDER_STATUS.TRIP_5_STARTED]: [
    ORDER_STATUS.ORDER_DELIVERED,
    ORDER_STATUS.ORDER_DELIVERED_5,
    ORDER_STATUS.TRIP_ABORTED
  ],
  [ORDER_STATUS.ORDER_DELIVERED_5]: [
    ORDER_STATUS.TRIP_6_STARTED,
    ORDER_STATUS.ORDER_CLOSED
  ],
  [ORDER_STATUS.TRIP_6_STARTED]: [
    ORDER_STATUS.ORDER_DELIVERED,
    ORDER_STATUS.TRIP_ABORTED
  ],
  [ORDER_STATUS.ORDER_DELIVERED]: [
    ORDER_STATUS.ORDER_CLOSED
  ],
  // Allow resuming from Trip Aborted back to Trip Started
  [ORDER_STATUS.TRIP_ABORTED]: [
    ORDER_STATUS.TRIP_STARTED,
    ORDER_STATUS.ORDER_CANCELLED
  ],
  // Legacy status support
  'Accepted': [
    ORDER_STATUS.ORDER_PICKED,
    ORDER_STATUS.ORDER_CANCELLED
  ]
};

class OrderStatusService {
  // Make ORDER_STATUS accessible as static property
  static ORDER_STATUS = ORDER_STATUS;

  /**
   * Notify customer backend about order status update
   */
  static async notifyCustomerStatusUpdate(orderId, newStatus, dpId = null) {
    try {
      // Get order with customer info
      const order = await _orders.findOne({
        where: { ORID: orderId },
        include: [
          { model: _order_trips, as: 'trips' }
        ]
      });

      if (!order) {
        console.warn(`⚠️ Order ${orderId} not found for notification`);
        return;
      }

      // Try to get customer ID from CID or ORCD
      const customerId = order.CID || order.ORCD;
      
      if (!customerId) {
        console.warn(`⚠️ No customer ID found for order ${orderId}`);
        return;
      }

      // Get customer details
      let customerData = null;
      if (order.CID) {
        customerData = await _customers.findOne({ where: { CID: order.CID } });
      }
      
      if (!customerData && order.ORCD) {
        customerData = await _customers.findOne({ where: { CID: order.ORCD } });
      }

      if (!customerData) {
        console.warn(`⚠️ Customer not found for order ${orderId}`);
        return;
      }

      // Get DP location if available
      let dpLocation = null;
      if (order.DPID) {
        const { _delivery_partner_location } = models;
        const dpLoc = await _delivery_partner_location.findOne({
          where: { DPID: order.DPID }
        });
        
        if (dpLoc && dpLoc.DPCLL) {
          const [lat, lng] = dpLoc.DPCLL.split(',').map(Number);
          dpLocation = { latitude: lat, longitude: lng };
        }
      }

      // Prepare notification payload
      const notificationPayload = {
        customerId: customerData.CID,
        orderId,
        status: newStatus,
        dp: dpId ? {
          id: dpId,
          name: 'Delivery Partner',
          phone: '',
          vehicle: ''
        } : null,
        dpLocation,
        estimatedTime: '15 mins'
      };

      // Send to customer backend
      const customerBackendUrl = process.env.CUSTOMER_BACKEND_URL || 'http://localhost:5000';
      
      console.log(`[Status Update] 📢 Notifying customer backend about status change to: ${newStatus}`);
      console.log(`[Status Update] 📤 Payload:`, JSON.stringify(notificationPayload, null, 2));

      await axios.post(
        `${customerBackendUrl}/api/internal/customer/notify-status-update`,
        notificationPayload
      ).catch(err => {
        console.error(`[Status Update] ❌ Failed to notify customer backend:`, err.message);
      });

    } catch (error) {
      console.error(`[Status Update] ❌ Error notifying customer:`, error.message);
    }
  }

  /**
   * Get all available order statuses from database
   */
  static async getAllStatuses() {
    try {
      const statuses = await _order_status.findAll({
        order: [['SID', 'ASC']]
      });
      return statuses;
    } catch (error) {
      console.error('❌ Error fetching order statuses:', error);
      throw error;
    }
  }

  /**
   * Validate if a status transition is allowed
   */
  static isValidTransition(currentStatus, newStatus) {
    const allowedTransitions = VALID_TRANSITIONS[currentStatus];
    if (!allowedTransitions) {
      console.warn(`⚠️ No transitions defined for status: ${currentStatus}`);
      return true; // Allow if no rules defined
    }
    return allowedTransitions.includes(newStatus);
  }

  /**
   * Update order status with validation
   */
  static async updateOrderStatus(orderId, newStatus, dpId = null) {
    let transaction;
    try {
      console.log(`🔄 updateOrderStatus called: orderId=${orderId}, newStatus=${newStatus}, dpId=${dpId}`);
      
      transaction = await sequelize.transaction();

      // Get current order
      const order = await _orders.findOne({
        where: { ORID: orderId },
        transaction
      });

      if (!order) {
        throw new Error('Order not found');
      }

      const currentStatus = order.ORST;
      
      // Trim any whitespace from status
      const trimmedCurrentStatus = currentStatus ? currentStatus.trim() : '';
      
      console.log(`📊 Current order status: "${currentStatus}" (trimmed: "${trimmedCurrentStatus}")`);
      console.log(`📊 Attempting transition: "${trimmedCurrentStatus}" → "${newStatus}"`);
      console.log(`📊 All VALID_TRANSITIONS keys:`, Object.keys(VALID_TRANSITIONS));

      // Validate transition - use trimmed status
      if (!this.isValidTransition(trimmedCurrentStatus, newStatus)) {
        console.error(`❌ Invalid transition from "${trimmedCurrentStatus}" to "${newStatus}"`);
        console.error(`❌ Allowed transitions for "${trimmedCurrentStatus}":`, VALID_TRANSITIONS[trimmedCurrentStatus]);
        console.error(`❌ Does key exist?`, trimmedCurrentStatus in VALID_TRANSITIONS);
        throw new Error(
          `Invalid status transition from "${currentStatus}" to "${newStatus}"`
        );
      }

      // Update order status
      const updateData = { ORST: newStatus };
      if (dpId) {
        updateData.DPID = dpId;
      }

      console.log(`💾 Updating order with data:`, updateData);

      const [updatedRows] = await _orders.update(
        updateData,
        {
          where: { ORID: orderId },
          transaction
        }
      );

      if (updatedRows === 0) {
        throw new Error('Failed to update order status');
      }

      await transaction.commit();

      console.log(`✅ Order ${orderId} status updated: ${currentStatus} → ${newStatus}`);

      // If order is fully delivered or closed, free up the DP for new orders
      const finalStatuses = [ORDER_STATUS.ORDER_DELIVERED, ORDER_STATUS.ORDER_CLOSED];
      if (finalStatuses.includes(newStatus) && (dpId || order.DPID)) {
        try {
          const { _delivery_partner_location } = models;
          await _delivery_partner_location.update(
            { DPOID: null },
            { where: { DPID: dpId || order.DPID } }
          );
          console.log(`📍 DPLocation cleared: DPOID=null for DPID=${dpId || order.DPID}`);
        } catch (locError) {
          console.error('⚠️ Failed to clear DPLocation on delivery:', locError.message);
        }
      }

      // Notify customer about status change (fire and forget)
      this.notifyCustomerStatusUpdate(orderId, newStatus, dpId).catch(err => {
        console.error('Failed to notify customer:', err);
      });

      return {
        success: true,
        orderId,
        previousStatus: currentStatus,
        newStatus,
        timestamp: new Date()
      };

    } catch (error) {
      if (transaction) await transaction.rollback();
      console.error('❌ Error updating order status:', error);
      throw error;
    }
  }

  /**
   * Get current order status
   */
  static async getOrderStatus(orderId) {
    try {
      const order = await _orders.findOne({
        where: { ORID: orderId },
        attributes: ['ORID', 'ORST', 'DPID', 'ORDT']
      });

      if (!order) {
        throw new Error('Order not found');
      }

      return {
        orderId: order.ORID,
        status: order.ORST,
        dpId: order.DPID,
        orderDate: order.ORDT
      };
    } catch (error) {
      console.error('❌ Error fetching order status:', error);
      throw error;
    }
  }

  /**
   * Get allowed next statuses for current order status
   */
  static async getAllowedTransitions(orderId) {
    try {
      const order = await _orders.findOne({
        where: { ORID: orderId }
      });

      if (!order) {
        throw new Error('Order not found');
      }

      const currentStatus = order.ORST;
      const allowedTransitions = VALID_TRANSITIONS[currentStatus] || [];

      return {
        orderId,
        currentStatus,
        allowedTransitions
      };
    } catch (error) {
      console.error('❌ Error fetching allowed transitions:', error);
      throw error;
    }
  }
}

export default OrderStatusService;
