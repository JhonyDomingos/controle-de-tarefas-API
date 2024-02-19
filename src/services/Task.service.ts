import { prisma } from "../database/prisma";
import {
  TaskCreate,
  TaskReturn,
  TaskUpdate,
} from "../interfaces/task.interface";
import { returnTask } from "../schema/task.schema";
import { Task } from "@prisma/client";
import { injectable } from "tsyringe";

@injectable()
class TaskService {
  public create = async (payload: TaskCreate): Promise<TaskReturn> => {
    const newTask = prisma.task.create({ data: payload });

    return newTask;
  };

  public read = async (
    category?: string | undefined
  ): Promise<Array<TaskReturn>> => {
    if (category) {
      return await prisma.task.findMany({
        where: { category: { name: category } },
        include: { category: true },
      });
    }
    const allTasks = await prisma.task.findMany({
      include: { category: true },
    });
    return returnTask.array().parse(allTasks);
  };
  public retrieve = async (foundTask: Task): Promise<TaskReturn> => {
    console.log(foundTask);
    return returnTask.parse(foundTask);
  };
  public delete = async (id: number): Promise<void> => {
    await prisma.task.delete({ where: { id: Number(id) } });
  };

  public partialUpdate = async (
    id: number,
    payload: TaskUpdate
  ): Promise<TaskReturn> => {
    const updatebody = await prisma.task.update({ where: { id }, data: payload });
    ;

    return updatebody
  };
}

export { TaskService };
