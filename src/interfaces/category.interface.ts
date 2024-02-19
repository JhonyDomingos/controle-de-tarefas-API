import { z } from "zod";
import { categorySchema, createCategorySchema } from "../schema/category.schema";


type CategoryCreate = z.infer<typeof createCategorySchema>;
type CategoryReturn = z.infer<typeof categorySchema>

export { CategoryCreate, CategoryReturn };
