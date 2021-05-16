import { ICreateTaskDTO } from "../../dtos/ICreateTaskDTO";
import { Task } from "../infra/typeorm/entities/Task";

interface ITasksRepository {
    Create(data: ICreateTaskDTO): Promise<Task>;
    FindById(task_id: string): Promise<Task>;
    FindTasks(
        description?: string,
        discipline?: string,
        pet?: string,
        title?: string,
        class_id?: string,
        validity?: Date
    ): Promise<Task[]>
}

export { ITasksRepository }