import { prisma } from "../database/prisma";
import {
  CategoryCreate,
  CategoryReturn,
} from "../interfaces/category.interface";

class categoryService {
  public create = async (payload: CategoryCreate): Promise<CategoryReturn> => {
    const newCategory = prisma.category.create({ data: payload });

    return newCategory;
  };

  public delete = async (id: number): Promise<CategoryReturn> => {
    return await prisma.category.delete({ where: { id: Number(id) } });
  };
}

export { categoryService };
