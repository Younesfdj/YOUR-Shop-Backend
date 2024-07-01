import { z } from "zod";

export const OrderDetailSchema = z.object({
  DetailId: z.number().optional(),
  DetailOrderId: z.number(),
  DetailProductId: z.number(),
  DetailQuantity: z.number().default(1),
  DetailProductName: z.string(),
  DetailProductPrice: z.number(),
  OrderSize: z.string(),
});
