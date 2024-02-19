import { Router } from "express";
import { ensure } from "../middlewares/Ensure.middleware";
import { createTaskSchema, updateTaskSchema } from "../schema/task.schema";
import { TaskController } from "../controllers/Task.controller";
import { container } from "tsyringe";
export const taskRouter: Router = Router();


container.registerSingleton("TaskController", TaskController)
const task = container.resolve(TaskController);

taskRouter.post(
  "/",
  ensure.validateBody(createTaskSchema),
  ensure.categoryExistsMiddleware,
  (req, res) => task.create(req, res)
);
taskRouter.get("/", (req, res) => task.read(req, res));

taskRouter.use("/:id", ensure.taskIdExists);

taskRouter.get("/:id", (req, res) => task.retrieve(req, res));
taskRouter.patch("/:id",ensure.validateBody(updateTaskSchema), (req, res) => task.update(req, res));
taskRouter.delete("/:id", (req, res) => task.delete(req, res));
