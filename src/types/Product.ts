import { z } from "zod";
import { ProductSchema } from "../schema/ProductSchema";
export type Product = z.infer<typeof ProductSchema>;
