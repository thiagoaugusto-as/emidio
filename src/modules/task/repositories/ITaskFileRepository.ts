import { TaskFile } from "../infra/typeorm/entities/TaskFile";

export interface IFindTaskFile {
    id?: string;
    user_id?: string;
    file_name?: string;
    sended_task_id?: string;
    task_id?: string;
}
interface ITaskFileRepository {
    create(
        user_id: string, 
        task_id: string, 
        file_name: string, 
        sended_task_id: string
    ): Promise<TaskFile>;
    delete(task_file_id: string): Promise<void>;
    findTasksFiles(data: IFindTaskFile): Promise<TaskFile[]>
}

export { ITaskFileRepository }