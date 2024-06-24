import { OrderDetailSchema } from "../schema/OrderDetailSchema";
import { z } from "zod";
export type OrderDetail = z.infer<typeof OrderDetailSchema>;
