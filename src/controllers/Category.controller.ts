import { CategoryCreate } from "../interfaces/category.interface";
import { categoryService } from "../services/Category.service";
import { Request, Response } from "express";
import { container, injectable } from "tsyringe";

@injectable()
export class CategoryController {
  private categoryService: categoryService = container.resolve(categoryService);
  public create = async (req: Request, res: Response): Promise<Response> => {
    const newCategory: CategoryCreate = await this.categoryService.create(
      req.body
    );
    return res.status(201).json(newCategory);
  };
  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.categoryService.delete(Number(req.params.id));
    return res.status(204).json();
  };
}
