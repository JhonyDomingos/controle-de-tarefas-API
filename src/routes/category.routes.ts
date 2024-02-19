import { Router } from "express";
import { ensure } from "../middlewares/Ensure.middleware";
import { createCategorySchema } from "../schema/category.schema";
import { CategoryController } from "../controllers/Category.controller";
import { container } from "tsyringe";

export const categoryRoute: Router = Router();

const category = container.resolve(CategoryController);
categoryRoute.post("/", ensure.validateBody(createCategorySchema), (req, res) =>
  category.create(req, res)
);

categoryRoute.delete("/:id", ensure.categoryIdExists, (req, res) =>
  category.delete(req, res)
);
