import { z } from "zod";
import {
  createTaskSchema,
  returnTask,
  updateTaskSchema,
} from "../schema/task.schema";

type TaskCreate = z.infer<typeof createTaskSchema>;
type TaskUpdate = z.infer<typeof updateTaskSchema>;
type TaskReturn = z.infer<typeof returnTask>;

export { TaskCreate, TaskUpdate, TaskReturn };
