import { z } from "zod";
export const OrderSchema = z.object({
  OrderId: z.number().optional(),
  OrderAmount: z.number(),
  OrderPhone: z.string().min(10),
  OrderEmail: z.string().email(),
  OrderDate: z.date().optional(),
  OrderWilaya: z.string().min(1),
  OrderAdress: z.string().min(1),
  OrderCommune: z.string().min(1),
  OrderStatus: z.enum(["PENDING", "SHIPPING", "DELIVERED"]).default("PENDING"),
});
