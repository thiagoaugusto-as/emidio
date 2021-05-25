import { inject, injectable } from "tsyringe";
import { TaskFile } from "../../infra/typeorm/entities/TaskFile";
import { TaskFileRepository } from "../../infra/typeorm/repositories/TaskFileRepository";

interface IRequest {
    id?: string,
    user_id?: string,
    file_name?: string,
    sended_task_id?: string,
    task_id?: string
}

@injectable()
class ListTaskFilesUseCase {
    constructor(
        @inject("TaskFileRepository")
        private taskFileRepository: TaskFileRepository
    ) {}

    async execute({
        id,
        user_id,
        file_name,
        sended_task_id,
        task_id
    }: IRequest): Promise<TaskFile[]> {
        const taskFiles = await this.taskFileRepository.findTasksFiles({
            file_name,
            id,
            sended_task_id,
            task_id,
            user_id
        });

        return taskFiles;
    }
}

export { ListTaskFilesUseCase }