import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../infra/typeorm/entities/Task";

interface ITasksRepository {
    Create(data: ICreateTaskDTO): Promise<Task>;
    FindById(task_id: string): Promise<Task>;
}

export { ITasksRepository }