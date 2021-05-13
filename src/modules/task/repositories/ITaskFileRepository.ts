import { TaskFile } from "../infra/typeorm/entities/TaskFile";

interface ITaskFileRepository {
    create(user_id: string, task_id: string, file_name: string): Promise<TaskFile>;
    delete(task_file_id: string): Promise<void>;
}

export { ITaskFileRepository }