import { inject, injectable } from "tsyringe";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { ITaskFileRepository } from "../../repositories/ITaskFileRepository";

interface IRequest {
    user_id: string;
    task_id: string;
    files_name: string[];
    sended_task_id: string;
}

@injectable()
class CreateTaskFileUseCase {
    constructor(
        @inject("TaskFileRepository")
        private taskFileRepository: ITaskFileRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ files_name, task_id, user_id, sended_task_id }: IRequest): Promise<void> {
        files_name.map( async (file) => {
            await this.taskFileRepository.create(user_id, task_id, file, sended_task_id);
            await this.storageProvider.save(file, "tasks");
        });
    }
}

export { CreateTaskFileUseCase }
