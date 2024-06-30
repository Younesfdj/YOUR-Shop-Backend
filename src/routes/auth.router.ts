import { Router } from "express";
import {
  registerUser,
  loginUser,
  registerAdmin,
  authUser,
} from "../controllers/auth.controller";
import {
  RegisterUserValidator,
  LogInUserValidator,
} from "../validators/UserValidator";
import { checkLogIn, isLoggedIn } from "../middlewares/auth";
const authRouter = Router();

authRouter.post("/register", RegisterUserValidator, registerUser);
authRouter.post("/registerAdmin", RegisterUserValidator, registerAdmin);
authRouter.post("/login", LogInUserValidator, loginUser);
authRouter.get("/me", checkLogIn, isLoggedIn, authUser);
export default authRouter;
