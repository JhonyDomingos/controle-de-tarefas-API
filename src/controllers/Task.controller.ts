import { Request, Response } from "express";
import { TaskService } from "../services/Task.service";
import { TaskCreate } from "../interfaces/task.interface";
import { container, injectable } from "tsyringe";
@injectable()
export class TaskController {
  private taskService: TaskService = container.resolve(TaskService);
  public create = async (req: Request, res: Response): Promise<Response> => {
    const newTask: TaskCreate = await this.taskService.create(req.body);
    return res.status(201).json(newTask);
  };
  public read = async (
    { query }: Request,
    res: Response
  ): Promise<Response> => {
    const queryparams = query.category ? String(query.category) : undefined;

    const allTasks = await this.taskService.read(queryparams);

    return res.status(200).json(allTasks);
  };
  public retrieve = async (_: Request, res: Response): Promise<Response> => {
    const { foundTask } = res.locals;

    const task = await this.taskService.retrieve(foundTask);

    return res.status(200).json(task);
  };
  public delete = async (req: Request, res: Response): Promise<Response> => {
    await this.taskService.delete(Number(req.params.id));

    return res.status(204).json();
  };

  public update = async (req: Request, res: Response): Promise<Response> => {
    const taskId = Number(req.params.id) 

    const taskUpdate = await this.taskService.partialUpdate(taskId, req.body)
    return res.status(200).json(taskUpdate);
  };
}
