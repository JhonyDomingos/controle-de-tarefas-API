import {  z } from "zod";
import { categorySchema } from "./category.schema";

const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  content: z.string(),
  finished: z.boolean().default(false),
  categoryId: z.number().positive().nullish(),
});

const taskReturn = taskSchema.extend({
  category: categorySchema.nullish()
})

const createTaskSchema = taskSchema.omit({ id: true });

const updateTaskSchema = createTaskSchema.partial();

const returnTask = taskReturn.omit({categoryId: true})

export { taskSchema, createTaskSchema, updateTaskSchema, returnTask };
