import { Router } from "express";
import { taskRouter } from "./task.routes";
import { categoryRoute } from "./category.routes";

export const routes: Router = Router()

routes.use("/tasks", taskRouter)
routes.use("/categories", categoryRoute)