import { Request, Response, NextFunction } from "express";
import {
  registerAdminService,
  registerUserService,
  loginUserService,
} from "../services/user/auth.service";
import { StatusCodes } from "http-status-codes";
import { MyRequest } from "../types/Express";
import { User } from "@prisma/client";

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { UserEmail, UserName, UserPassword, UserPhone } = req.body;
  const result = await registerUserService(
    UserEmail,
    UserName,
    UserPassword,
    UserPhone
  );
  if (result instanceof Error) return next(result);

  res.status(StatusCodes.ACCEPTED).json(result);
};
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { UserEmail, UserPassword } = req.body;
  const result = await loginUserService(UserEmail, UserPassword);

  if (result instanceof Error) return next(result);

  res.status(StatusCodes.ACCEPTED).json(result);
};
const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { UserEmail, UserName, UserPassword, UserPhone } = req.body;
  const result = await registerAdminService(
    UserEmail,
    UserName,
    UserPassword,
    UserPhone
  );
  if (result instanceof Error) return next(result);

  res.status(StatusCodes.ACCEPTED).json(result);
};

const authUser = async (
  req: MyRequest<null | User>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  res.status(StatusCodes.OK).json({
    UserId: user?.UserId,
    UserName: user?.UserName,
    UserEmail: user?.UserEmail,
  });
};

export { registerUser, loginUser, registerAdmin, authUser };
