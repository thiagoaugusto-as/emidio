import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../infra/typeorm/entities/Task";

export interface IFindTasks {
    description?: string;
    discipline?: string;
    pet?: string;
    title?: string;
    class_id?: string;
    validity?: Date;
    id?: string;
}
interface ITasksRepository {
    Create(data: ICreateTaskDTO): Promise<Task>;
    FindById(task_id: string): Promise<Task>;
    FindTasks(data: IFindTasks): Promise<Task[]>;
    UpdateTask(task: Task): Promise<Task>;
}

export { ITasksRepository }