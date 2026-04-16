import OrderStatusService from '../services/orderStatusService.js';
import { sendResult, sendError } from '../constant/HttpResponse.js';

class OrderStatusController {
  
  /**
   * GET /api/v1/deliveryPartner/order/:orderId/status
   * Get current order status
   */
  static getOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const status = await OrderStatusService.getOrderStatus(orderId);
      
      return sendResult({
        resCode: 200,
        res,
        result: status,
        message: "Order status fetched successfully"
      });
    } catch (error) {
      console.error('❌ GetOrderStatus Error:', error);
      return sendError({
        errorCode: error.message === 'Order not found' ? 404 : 500,
        res,
        error: error.message,
        message: "Failed to fetch order status"
      });
    }
  };

  /**
   * GET /api/v1/deliveryPartner/order/:orderId/allowed-transitions
   * Get allowed status transitions for an order
   */
  static getAllowedTransitions = async (req, res) => {
    try {
      const { orderId } = req.params;
      const transitions = await OrderStatusService.getAllowedTransitions(orderId);
      
      return sendResult({
        resCode: 200,
        res,
        result: transitions,
        message: "Allowed transitions fetched successfully"
      });
    } catch (error) {
      console.error('❌ GetAllowedTransitions Error:', error);
      return sendError({
        errorCode: error.message === 'Order not found' ? 404 : 500,
        res,
        error: error.message,
        message: "Failed to fetch allowed transitions"
      });
    }
  };

  /**
   * POST /api/v1/deliveryPartner/order/:orderId/status
   * Update order status
   */
  static updateOrderStatus = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const dpId = req.user?.DPID;

      if (!status) {
        return sendError({
          errorCode: 400,
          res,
          error: 'Status is required',
          message: "Please provide the new status"
        });
      }

      const result = await OrderStatusService.updateOrderStatus(orderId, status, dpId);
      
      return sendResult({
        resCode: 200,
        res,
        result,
        message: `Order status updated to ${status} successfully`
      });
    } catch (error) {
      console.error('❌ UpdateOrderStatus Error:', error);
      return sendError({
        errorCode: error.message.includes('Invalid status transition') ? 400 : 500,
        res,
        error: error.message,
        message: "Failed to update order status"
      });
    }
  };

  /**
   * POST /api/v1/deliveryPartner/order/:orderId/pickup
   * Mark order as picked up
   */
  static markOrderPicked = async (req, res) => {
    try {
      const { orderId } = req.params;
      const dpId = req.user?.DPID;

      console.log('📦 MarkOrderPicked - orderId:', orderId, 'dpId:', dpId);
      console.log('📦 MarkOrderPicked - req.user:', JSON.stringify(req.user, null, 2));
      console.log('📦 MarkOrderPicked - Target status:', OrderStatusService.ORDER_STATUS.ORDER_PICKED);

      if (!dpId) {
        console.error('❌ No DPID found in JWT token!');
        return sendError({
          errorCode: 401,
          res,
          error: 'Missing DPID in token',
          message: "Authentication error: Missing DPID"
        });
      }

      const result = await OrderStatusService.updateOrderStatus(
        orderId, 
        OrderStatusService.ORDER_STATUS.ORDER_PICKED, 
        dpId
      );
      
      return sendResult({
        resCode: 200,
        res,
        result,
        message: "Order marked as picked up successfully"
      });
    } catch (error) {
      console.error('❌ MarkOrderPicked Error:', error);
      console.error('❌ MarkOrderPicked Stack:', error.stack);
      console.error('❌ MarkOrderPicked Full error:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      return sendError({
        errorCode: 500,
        res,
        error: error.message,
        message: "Failed to mark order as picked up: " + error.message
      });
    }
  };

  /**
   * POST /api/v1/deliveryPartner/order/:orderId/start-trip
   * Start the trip (after picking up order)
   */
  static startTrip = async (req, res) => {
    try {
      const { orderId } = req.params;
      const dpId = req.user?.DPID;

      const result = await OrderStatusService.updateOrderStatus(
        orderId, 
        OrderStatusService.ORDER_STATUS.TRIP_STARTED, 
        dpId
      );
      
      return sendResult({
        resCode: 200,
        res,
        result,
        message: "Trip started successfully"
      });
    } catch (error) {
      console.error('❌ StartTrip Error:', error);
      return sendError({
        errorCode: 500,
        res,
        error: error.message,
        message: "Failed to start trip"
      });
    }
  };

  /**
   * POST /api/v1/deliveryPartner/order/:orderId/deliver
   * Mark order as delivered
   */
  static markOrderDelivered = async (req, res) => {
    try {
      const { orderId } = req.params;
      const dpId = req.user?.DPID;

      const result = await OrderStatusService.updateOrderStatus(
        orderId, 
        OrderStatusService.ORDER_STATUS.ORDER_DELIVERED, 
        dpId
      );
      
      return sendResult({
        resCode: 200,
        res,
        result,
        message: "Order marked as delivered successfully"
      });
    } catch (error) {
      console.error('❌ MarkOrderDelivered Error:', error);
      return sendError({
        errorCode: 500,
        res,
        error: error.message,
        message: "Failed to mark order as delivered"
      });
    }
  };

  /**
   * POST /api/v1/deliveryPartner/order/:orderId/resume
   * Resume order after incident (Trip Aborted -> Trip Started)
   */
  static resumeOrder = async (req, res) => {
    try {
      const { orderId } = req.params;
      const dpId = req.user?.DPID;

      console.log('🔄 ResumeOrder - orderId:', orderId, 'dpId:', dpId);

      if (!dpId) {
        console.error('❌ No DPID found in JWT token!');
        return sendError({
          errorCode: 401,
          res,
          error: 'Missing DPID in token',
          message: "Authentication error: Missing DPID"
        });
      }

      const result = await OrderStatusService.updateOrderStatus(
        orderId, 
        OrderStatusService.ORDER_STATUS.TRIP_STARTED, 
        dpId
      );
      
      return sendResult({
        resCode: 200,
        res,
        result,
        message: "Order resumed successfully. Status: Trip Started"
      });
    } catch (error) {
      console.error('❌ ResumeOrder Error:', error);
      console.error('❌ ResumeOrder Stack:', error.stack);
      return sendError({
        errorCode: 500,
        res,
        error: error.message,
        message: "Failed to resume order: " + error.message
      });
    }
  };

  /**
   * GET /api/v1/deliveryPartner/order-statuses
   * Get all available order statuses
   */
  static getAllStatuses = async (req, res) => {
    try {
      const statuses = await OrderStatusService.getAllStatuses();
      
      return sendResult({
        resCode: 200,
        res,
        result: statuses,
        message: "Order statuses fetched successfully"
      });
    } catch (error) {
      console.error('❌ GetAllStatuses Error:', error);
      return sendError({
        errorCode: 500,
        res,
        error: error.message,
        message: "Failed to fetch order statuses"
      });
    }
  };
}

export default OrderStatusController;
