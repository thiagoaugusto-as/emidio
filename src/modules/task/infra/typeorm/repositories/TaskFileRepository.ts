import { getRepository, Repository } from "typeorm";
import { ITaskFileRepository } from "../../../repositories/ITaskFileRepository";
import { TaskFile } from "../entities/TaskFile";

class TaskFileRepository implements ITaskFileRepository {
    private repository: Repository<TaskFile>

    constructor() {
        this.repository = getRepository(TaskFile);
    }

    async create(
        user_id: string,
        task_id: string, 
        file_name: string,
        sended_task_id: string
    ): Promise<TaskFile> {
        const taskFile = this.repository.create({
            file_name,
            task_id,
            user_id,
            sended_task_id
        });

        await this.repository.save(taskFile);

        return taskFile;
    }

    async delete(task_file_id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async findTasksFiles(
        id?: string,
        user_id?: string,
        file_name?: string,
        sended_task_id?: string,
        task_id?: string
    ): Promise<TaskFile[]> {
        const taskFileQuery = this.repository.createQueryBuilder("tf");

        if(id)
            taskFileQuery.andWhere("tf.id = :id", { id });

        if(user_id)
            taskFileQuery.andWhere("tf.user_id = :user_id", { user_id });

        if(file_name)
            taskFileQuery.andWhere("tf.file_name = :file_name", { file_name });

        if(sended_task_id)
            taskFileQuery.andWhere("tf.sended_task_id = :sended_task_id", { sended_task_id });

        if(task_id)
            taskFileQuery.andWhere("tf.task_id = :task_id", { task_id });

        const tasksFiles = await taskFileQuery.getMany();

        return tasksFiles;
    }
}

export { TaskFileRepository }