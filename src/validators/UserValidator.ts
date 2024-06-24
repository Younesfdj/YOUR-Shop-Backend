import { Request, Response, NextFunction } from "express";
import { UserSchema, LogInUserSchema } from "../schema/UserSchema";
import { UnprocessedEntityError } from "../errors/unprocessed-entity";
/**
 * Validates the request body for registering a user.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 */
export const RegisterUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = UserSchema.safeParse(req.body);
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  next();
};

/**
 * Validates the request body for logging in a user.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The Express next function.
 */
export const LogInUserValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = LogInUserSchema.safeParse(req.body);
  if (error) {
    return next(new UnprocessedEntityError(error.message, 1006));
  }
  next();
};
