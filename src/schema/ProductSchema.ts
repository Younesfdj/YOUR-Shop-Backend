import { z } from "zod";
export const ProductSchema = z.object({
  ProductId: z.number().optional(),
  ProductName: z.string().min(4),
  ProductSKU: z.string().min(4),
  ProductPrice: z.number().min(0),
  ProductDesc: z.string().min(10),
  ProductQuantity: z.number().min(0).default(1),
  ProductCategoryId: z.number().min(1),
  ProductSizes: z.string().default("s-m-l-xl-xxl"),
});
