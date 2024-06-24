import { z } from "zod";

export const CategorySchema = z.object({
  CategoryId: z.number().optional(),
  CategoryName: z.string().min(4),
});
