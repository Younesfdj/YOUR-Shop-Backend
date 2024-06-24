import { Router } from "express";
import {
  registerUser,
  loginUser,
  registerAdmin,
} from "../controllers/auth.controller";
import {
  RegisterUserValidator,
  LogInUserValidator,
} from "../validators/UserValidator";

const authRouter = Router();

authRouter.post("/register", RegisterUserValidator, registerUser);
authRouter.post("/registerAdmin", RegisterUserValidator, registerAdmin);
authRouter.post("/login", LogInUserValidator, loginUser);

export default authRouter;
