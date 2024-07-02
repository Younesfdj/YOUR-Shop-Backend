import { Router } from "express";
import {
  getOrder,
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
  makeCompleteOrder,
} from "../controllers/order.controller";
import { checkLogIn, isAdmin, isLoggedIn } from "../middlewares/auth";
import {
  OrderValidator,
  makeCompleteOrderValidator,
} from "../validators/OrderValidator";

const orderRouter = Router();

orderRouter.get("/orders", checkLogIn, isLoggedIn, isAdmin, getOrders);
orderRouter.get("/order/:id", checkLogIn, isLoggedIn, isAdmin, getOrder);
orderRouter.post("/order", checkLogIn, addOrder);
orderRouter.post("/make-order", makeCompleteOrderValidator, makeCompleteOrder);
orderRouter.put("/order/:id", checkLogIn, isLoggedIn, isAdmin, updateOrder);
orderRouter.delete("/order/:id", checkLogIn, isLoggedIn, isAdmin, deleteOrder);

export default orderRouter;
