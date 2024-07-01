import { Application } from "express";
import authRouter from "./auth.router";
import productRouter from "./products.router";
import orderRouter from "./order.router";
import categoryRouter from "./category.route";
import orderDetailRouter from "./orderDetail.router";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "../docs/swagger.json";
export default function setRouters(app: Application) {
  app.use("/auth", authRouter);
  app.use("/", productRouter);
  app.use("/", categoryRouter);
  app.use("/", orderRouter);
  app.use("/", orderDetailRouter);
  // app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}
