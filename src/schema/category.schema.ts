import { z } from "zod";

const categorySchema = z.object({
    id: z.number().int().positive(), 
    name: z.string()
})

const createCategorySchema = categorySchema.omit({id: true})


export { categorySchema, createCategorySchema}