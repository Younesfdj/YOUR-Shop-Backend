import { CategorySchema } from "../schema/CategorySchema";
import { Request, Response, NextFunction } from "express";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
/**
 * Middleware function to validate the request body for category data.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */

export const CategoryValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = CategorySchema.safeParse(req.body);
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  next();
};
