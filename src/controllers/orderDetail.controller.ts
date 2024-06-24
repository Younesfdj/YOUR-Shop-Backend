import { Request, Response, NextFunction } from "express";
import {
  getOrderDetailService,
  getOrdersDetailService,
  updateOrderDetailService,
  deleteOrderDetailService,
  addOrderDetailService,
} from "../services/orders/orderDetail.service";
import { StatusCodes } from "http-status-codes";
import { OrderSchema } from "../schema/OrderSchema";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
import { MyRequest } from "../types/Express";
import { User } from "@prisma/client";

export const getOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = OrderSchema.shape.OrderId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await getOrderDetailService(parseInt(id));
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const getOrdersDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await getOrdersDetailService();
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const addOrderDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newOrder = req.body;
  const result = await addOrderDetailService(newOrder);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.CREATED).json(result);
};

export const updateOrderDetail = async (
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
  const result = await updateOrderDetailService(parseInt(id), newOrder);
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json(result);
};

export const deleteOrderDetail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { error } = OrderSchema.shape.OrderId.safeParse(parseInt(id));
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const result = await deleteOrderDetailService(parseInt(id));
  if (result instanceof Error) return next(result);
  res.status(StatusCodes.OK).json({ message: "Order deleted successfully" });
};
