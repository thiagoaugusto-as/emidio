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
}

export { TaskFileRepository }