import { Request, Response, NextFunction } from "express";
import {
  getOrderService,
  getOrdersService,
  updateOrderService,
  deleteOrderService,
  addOrderService,
  makeOrderService,
} from "../services/orders/order.service";
import { StatusCodes } from "http-status-codes";
import { OrderSchema } from "../schema/OrderSchema";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
import { MyRequest } from "../types/Express";
import { User } from "@prisma/client";

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = OrderSchema.shape.OrderId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await getOrderService(parseInt(id));
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getOrdersService();
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const addOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newOrder = req.body;
  const result = await addOrderService(newOrder);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.CREATED).json(result);
};

export const updateOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = OrderSchema.shape.OrderId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const newOrder = req.body;
  const result = await updateOrderService(parseInt(id), newOrder);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = OrderSchema.shape.OrderId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await deleteOrderService(parseInt(id));
  if (result instanceof Error) return next(result);
  res
    .status(StatusCodes.OK)
    .json({ message: "Order deleted successfully", data: result });
};

export const makeCompleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newOrder = req.body;
  const result = await makeOrderService({
    orderInfo: newOrder.orderInfo,
    orderProducts: newOrder.orderProducts,
  });
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.CREATED).json(result);
};
