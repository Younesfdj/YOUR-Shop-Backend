import { ProductSchema } from "../schema/ProductSchema";
import { Request, Response, NextFunction } from "express";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";

/**
 * Middleware function to validate the request body against the ProductSchema.
 * If the validation fails, it will call the error handling middleware with an UnprocessedEntityError.
 * If the validation succeeds, it will call the next middleware in the chain.
 *
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The next middleware function.
 */
export const ProductValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = ProductSchema.safeParse(req.body);
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  next();
};
