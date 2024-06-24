import { z } from "zod";
import { OrderSchema } from "../schema/OrderSchema";
type Order = z.infer<typeof OrderSchema>;

declare interface OrderI {
  orderInfo: Order;
  orderProducts: {
    DetailProductId: number;
    DetailQuantity: number;
  }[];
}
export { OrderI, Order };
