import { z } from "zod";
import { CategorySchema } from "../schema/CategorySchema";
export type Category = z.infer<typeof CategorySchema>;
