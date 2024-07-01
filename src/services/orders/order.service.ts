import { InternalError } from "../../errors/internal-error";
import { prismaClient } from "../../config/prisma";
import { BadRequestError } from "../../errors/bad-request";
import { Order, OrderI } from "../../types/Order";
import {
  addOrderDetailService,
  deleteOrderDetailService,
  checkProductQuantity,
} from "./orderDetail.service";
import { log } from "../../utils/logger";

// TODO: implement update order status

/**
 * @description  Get Order by Id
 * @param OrderId  - number
 * @returns  Error | BadRequestError | Order
 */

export const getOrderService = async (OrderId: number) => {
  try {
    const order = await prismaClient.order.findUnique({
      where: {
        OrderId: OrderId,
      },
    });
    const orderDetails = await prismaClient.orderDetail.findMany({
      where: {
        DetailOrderId: OrderId,
      },
    });
    if (!order) {
      return new BadRequestError("Order not found", 4001);
    }
    return {
      ...order,
      OrderDetails: orderDetails,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Get Orders
 * @returns  Error | BadRequestError | Order
 */

export const getOrdersService = async () => {
  try {
    const orders = await prismaClient.order.findMany();
    return orders;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Add an Order
 * @param newOrder  - Order
 * @returns  Error | BadRequestError | Order
 */

export const addOrderService = async (newOrder: Order) => {
  try {
    const order = await prismaClient.order.create({
      data: {
        OrderAmount: newOrder.OrderAmount,
        OrderCommune: newOrder.OrderCommune,
        OrderWilaya: newOrder.OrderWilaya,
        OrderPhone: newOrder.OrderPhone,
        OrderStatus: newOrder.OrderStatus,
        OrderFName: newOrder.OrderFName,
        OrderLName: newOrder.OrderLName,
        OrderShippingMode: newOrder.OrderShippingMode,
      },
    });
    return {
      OrderId: order.OrderId,
      OrderAmount: order.OrderAmount,
      OrderPhone: order.OrderPhone,
      OrderDate: order.OrderDate,
      OrderCommune: newOrder.OrderCommune,
      OrderWilaya: newOrder.OrderWilaya,
      OrderStatus: order.OrderStatus,
      OrderFName: newOrder.OrderFName,
      OrderLName: newOrder.OrderLName,
      OrderShippingMode: newOrder.OrderShippingMode,
    };
  } catch (error) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Update an Order
 * @param OrderId  - number
 * @param newOrder  - Order
 * @returns  Error | BadRequestError | Order
 */

export const updateOrderService = async (OrderId: number, newOrder: Order) => {
  try {
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Delete an Order
 * @param OrderId  - number
 * @returns  Error | BadRequestError | OrderI
 */

export const deleteOrderService = async (OrderId: number) => {
  try {
    const orderExists = await prismaClient.order.findUnique({
      where: {
        OrderId,
      },
    });
    if (!orderExists) {
      return new BadRequestError("Order not found", 4001);
    }
    const orderDetails = await prismaClient.orderDetail.deleteMany({
      where: {
        DetailOrderId: OrderId,
      },
    });
    const order = await prismaClient.order.delete({
      where: {
        OrderId,
      },
    });
    return {
      orderInfo: {
        OrderId: order.OrderId,
        OrderAmount: order.OrderAmount,
        OrderPhone: order.OrderPhone,
        OrderDate: order.OrderDate,
        OrderCommune: order.OrderCommune,
        OrderWilaya: order.OrderWilaya,
        OrderStatus: order.OrderStatus,
        OrderFName: order.OrderFName,
        OrderLName: order.OrderLName,
        OrderShippingMode: order.OrderShippingMode,
      },
      orderProducts: orderDetails,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};
/**
 * @description  Make an Order
 * @param order  - OrderI
 * @returns  Error | BadRequestError | OrderI
 */
export const makeOrderService = async (order: OrderI) => {
  try {
    // check first if the quantity is available for each product
    for (let index = 0; index < order.orderProducts.length; index++) {
      const element = order.orderProducts[index];
      const productQuantity = await checkProductQuantity(
        element.DetailProductId,
        element.DetailQuantity
      );
      if (productQuantity instanceof Error) {
        return productQuantity;
      }
    }
    const orderResult = await addOrderService(order.orderInfo);
    if (orderResult instanceof Error) {
      return orderResult;
    }
    for (let index = 0; index < order.orderProducts.length; index++) {
      const element = order.orderProducts[index];
      const orderDetailResult = await addOrderDetailService({
        DetailOrderId: orderResult.OrderId,
        DetailProductId: element.DetailProductId,
        DetailQuantity: element.DetailQuantity,
        DetailProductName: element.DetailProductName,
        DetailProductPrice: element.DetailProductPrice,
        OrderSize: element.OrderSize,
      });
      if (orderDetailResult instanceof Error) {
        return orderDetailResult;
      }
    }

    return {
      orderInfo: orderResult,
      orderProducts: order.orderProducts,
    };
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};
