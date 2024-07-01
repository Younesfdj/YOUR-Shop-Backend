import { InternalError } from "../../errors/internal-error";
import { prismaClient } from "../../config/prisma";
import { BadRequestError } from "../../errors/bad-request";
import { OrderDetail } from "../../types/OrderDetail";
import { log } from "../../utils/logger";
import {
  getProductService,
  updateProductService,
} from "../inventory/product.service";
import { getOrderService } from "./order.service";

/**
 * @description  Get Order Detail by Id
 * @param DetailId  - number
 * @returns  Error | BadRequestError | OrderDetail
 */

export const getOrderDetailService = async (DetailId: number) => {
  try {
    const orderDetail = await prismaClient.orderDetail.findUnique({
      where: {
        DetailId: DetailId,
      },
    });
    if (!orderDetail) {
      return new BadRequestError("Order Detail not found", 5001);
    }
    return orderDetail;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Get Orders Detail
 * @returns  Error | BadRequestError | OrderDetail
 */

export const getOrdersDetailService = async () => {
  try {
    const ordersDetail = await prismaClient.orderDetail.findMany();
    return ordersDetail;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

export const checkProductQuantity = async (
  productId: number,
  quantity: number
) => {
  try {
    const product = await getProductService(productId);
    if (product instanceof Error) {
      return product;
    }
    if (product.ProductQuantity < quantity) {
      return new BadRequestError(
        `Product with id=${product.ProductId} out of stock`,
        2003
      );
    }
    return product;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Add an Order Detail
 * @param newOrderDetail  - OrderDetail
 * @returns  Error | BadRequestError | OrderDetail
 */

export const addOrderDetailService = async (newOrderDetail: OrderDetail) => {
  try {
    const orderExits = await getOrderService(newOrderDetail.DetailOrderId);
    if (orderExits instanceof Error) {
      return orderExits;
    }
    const productExists = await getProductService(
      newOrderDetail.DetailProductId
    );
    if (productExists instanceof Error) {
      return productExists;
    } else if (productExists.ProductQuantity < newOrderDetail.DetailQuantity) {
      return new BadRequestError("Product out of stock", 2003);
    }

    const updatedProduct = await updateProductService(productExists.ProductId, {
      ...productExists,
      ProductQuantity:
        productExists.ProductQuantity - newOrderDetail.DetailQuantity,
    });

    if (updatedProduct instanceof Error) {
      return updatedProduct;
    }

    const orderDetail = await prismaClient.orderDetail.create({
      data: {
        DetailOrderId: newOrderDetail.DetailOrderId,
        DetailProductId: newOrderDetail.DetailProductId,
        DetailQuantity: newOrderDetail.DetailQuantity,
        DetailProductName: newOrderDetail.DetailProductName,
        DetailProductPrice: newOrderDetail.DetailProductPrice,
        OrderSize: newOrderDetail.OrderSize,
      },
    });
    return {
      DetailId: orderDetail.DetailId,
      DetailOrderId: orderDetail.DetailOrderId,
      DetailProductId: orderDetail.DetailProductId,
      DetailQuantity: orderDetail.DetailQuantity,
    };
  } catch (error) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Update an Order Detail
 * @param DetailId  - number
 * @param newOrderDetail  - Order
 * @returns  Error | BadRequestError | Order
 */

export const updateOrderDetailService = async (
  DetailId: number,
  newOrderDetail: OrderDetail
) => {
  try {
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};

/**
 * @description  Delete an Order Detail
 * @param DetailId  - number
 * @returns  Error | BadRequestError | Order
 */

export const deleteOrderDetailService = async (DetailId: number) => {
  try {
    const orderDetail = await prismaClient.orderDetail.findUnique({
      where: {
        DetailId: DetailId,
      },
    });
    if (!orderDetail) {
      return new BadRequestError("Order Detail not found", 5001);
    }
    await prismaClient.orderDetail.delete({
      where: {
        DetailId: DetailId,
      },
    });
    return orderDetail;
  } catch (error: any) {
    return new InternalError("Something went wrong", 1007, error);
  }
};
