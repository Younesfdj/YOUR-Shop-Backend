import { OrderSchema } from "../schema/OrderSchema";
import { Request, Response, NextFunction } from "express";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
import { OrderDetailSchema } from "../schema/OrderDetailSchema";
export const OrderValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = OrderSchema.safeParse(req.body);
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  next();
};

export const makeCompleteOrderValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = OrderSchema.safeParse(req.body.orderInfo);
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  const orderProducts = req.body.orderProducts;
  if (!Array.isArray(orderProducts)) {
    return next(
      new UnprocessedEntityError("Order Products should be an array", 1006)
    );
  }
  for (const orderProduct of orderProducts) {
    const { error } = OrderDetailSchema.shape.DetailProductId.safeParse(
      orderProduct.DetailProductId
    );
    const { error: error2 } = OrderDetailSchema.shape.DetailQuantity.safeParse(
      orderProduct.DetailQuantity
    );
    if (error || error2) {
      return new UnprocessedEntityError(
        (error?.message as string) || (error2?.message as string),
        1006
      );
    }
  }
  next();
};
