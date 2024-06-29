import { z } from "zod";
export const OrderSchema = z.object({
  OrderId: z.number().optional(),
  OrderFName: z.string().min(2),
  OrderLName: z.string().min(2),
  OrderAmount: z.number(),
  OrderPhone: z.string().min(10),
  OrderWilaya: z.string().min(1),
  OrderCommune: z.string().min(1),
  OrderShippingMode: z.enum(["AGENCY", "HAND"]),
  OrderDate: z.date().optional(),
  OrderStatus: z.enum(["PENDING", "SHIPPING", "DELIVERED"]).default("PENDING"),
});
