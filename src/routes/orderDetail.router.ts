import { Router } from "express";
import {
  getOrderDetails,
  getOrdersDetail,
  addOrderDetail,
  updateOrderDetail,
  deleteOrderDetail,
} from "../controllers/orderDetail.controller";
import { checkLogIn, isAdmin, isLoggedIn } from "../middlewares/auth";
import { OrderDetailValidator } from "../validators/OrderDetailValidator";

const orderDetailRouter = Router();

orderDetailRouter.get(
  "/orders-detail",
  checkLogIn,
  isLoggedIn,
  isAdmin,
  getOrdersDetail
);
orderDetailRouter.get(
  "/order-details/:id",
  checkLogIn,
  isLoggedIn,
  isAdmin,
  getOrderDetails
);
orderDetailRouter.post("/order-details", OrderDetailValidator, addOrderDetail);
orderDetailRouter.put(
  "/order-details/:id",
  checkLogIn,
  isLoggedIn,
  isAdmin,
  OrderDetailValidator,
  updateOrderDetail
);
orderDetailRouter.delete(
  "/order-details/:id",
  checkLogIn,
  isLoggedIn,
  isAdmin,
  deleteOrderDetail
);

export default orderDetailRouter;
