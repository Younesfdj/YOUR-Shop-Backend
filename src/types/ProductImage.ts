import { z } from "zod";
import { ProductImageSchema } from "../schema/ProductImageSchema";
export type ProductImage = z.infer<typeof ProductImageSchema>;
