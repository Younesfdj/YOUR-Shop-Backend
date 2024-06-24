import { OrderDetailSchema } from "../schema/OrderDetailSchema";
import { Request, Response, NextFunction } from "express";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";

export const OrderDetailValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = OrderDetailSchema.safeParse(req.body);
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  next();
};
