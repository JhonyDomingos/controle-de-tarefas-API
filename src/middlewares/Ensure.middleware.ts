import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

class EnsureMiddleware {
  public validateBody =
    (schema: AnyZodObject) =>
    (req: Request, _: Response, nextFunction: NextFunction): void => {
      req.body = schema.parse(req.body);
      return nextFunction();
    };

  public categoryExistsMiddleware = async (
    req: Request,
    _: Response,
    nextFunction: NextFunction
  ): Promise<void> => {
    const { categoryId } = req.body;

    if (!categoryId) {
      return nextFunction();
    }

    const foundCategory = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }

    nextFunction();
  };

  public taskIdExists = async (
    req: Request,
    res: Response,
    nextFunction: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    const foundTask = await prisma.task.findFirst({
      where: { id: Number(id) },
      include: { category: true },
    });

    if (!foundTask) {
      throw new AppError("Task not found", 404);
    }
    res.locals.foundTask = foundTask;
    

    return nextFunction();
  };

  public categoryIdExists = async (
    req: Request,
    res: Response,
    nextFunction: NextFunction
  ): Promise<void> => {
    const { id } = req.params;

    const foundCategory = await prisma.category.findFirst({
      where: { id: Number(id) },
    });

    if (!foundCategory) {
      throw new AppError("Category not found", 404);
    }
    return nextFunction();
  };
}
export const ensure = new EnsureMiddleware();
