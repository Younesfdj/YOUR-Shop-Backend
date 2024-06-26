import { z } from "zod";

export const ProductImageSchema = z.object({
  ProductImageId: z.number().optional(),
  ProductImagePath: z.string().min(4).url(),
  ProductId: z.number().min(1),
});
