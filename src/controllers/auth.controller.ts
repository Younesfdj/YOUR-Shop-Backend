import { Request, Response, NextFunction } from "express";
import {
  registerAdminService,
  registerUserService,
  loginUserService,
} from "../services/user/auth.service";
import { StatusCodes } from "http-status-codes";

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

export { registerUser, loginUser, registerAdmin };
