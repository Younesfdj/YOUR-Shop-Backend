import { Router } from "express";
import {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
import { checkLogIn, isAdmin, isLoggedIn } from "../middlewares/auth";
import { ProductValidator } from "../validators/ProductValidator";

const productRouter = Router();

productRouter.get("/products", getProducts);
productRouter.get("/product/:id", getProduct);
productRouter.post(
  "/product",
  checkLogIn,
  isLoggedIn,
  isAdmin,
  ProductValidator,
  addProduct
);
productRouter.put(
  "/product/:id",
  checkLogIn,
  isLoggedIn,
  isAdmin,
  ProductValidator,
  updateProduct
);
productRouter.delete(
  "/product/:id",
  checkLogIn,
  isLoggedIn,
  isAdmin,
  deleteProduct
);

export default productRouter;
