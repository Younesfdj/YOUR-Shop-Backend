import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request";
import { prismaClient } from "../config/prisma";
import { verifyToken } from "../utils/jwt";
import { MyRequest } from "../types/Express";
import { InternalError } from "../errors/internal-error";
import { log } from "../utils/logger";
/**
 * @description  Extract the token from the request
 * @param {Request} req - The request object
 * @returns {string | null} - The token or null
 *
 * ```ts
 * const token = extractToken(req);
 * ```
 */

function extractToken(req: Request): string | null {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer "))
    return authHeader.slice(7);
  if (req.cookies?.token) return req.cookies.token;
  return null;
}

/**
 * @description  Checks if the user is logged in
 * @param {MyRequest<null | UsersTypes>} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @returns
 * - {NextFunction} - The next function
 *
 */

export const checkLogIn = async (
  req: MyRequest<null | UserI>,
  res: Response,
  next: NextFunction
) => {
  const token = extractToken(req);
  req.user = null;
  if (token) {
    try {
      const payload = verifyToken(token);
      if (!payload || !payload.UserId)
        return next(new BadRequestError("Invalid token", 1004));
      const { UserId } = payload;

      const user = await prismaClient.user.findUnique({
        where: {
          UserId,
        },
      });
      if (!user) {
        return next(new BadRequestError("User not found", 1001));
      }
      req.user = user;
    } catch (e) {
      res.clearCookie("token");
      return next(new InternalError("Something went wrong", 1007, e));
    }
  }
  return next();
};

/**
 * @description  Check if the user is logged in
 * @param {MyRequest<UserD>} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @returns
 * - {NextFunction} - The next function
 *
 */
export const isLoggedIn = (
  req: MyRequest<null | UserI>,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    return next();
  }
  return next(new BadRequestError("Unauthorized", 1005));
};

export const isAdmin = (
  req: MyRequest<null | UserI>,
  res: Response,
  next: NextFunction
) => {
  log.debug(req.user);
  if (req.user?.UserRole === "ADMIN") {
    return next();
  }
  return next(new BadRequestError("Unauthorized", 1005));
};
