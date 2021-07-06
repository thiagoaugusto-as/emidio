import { inject, injectable } from "tsyringe";
import { Task } from "../../infra/typeorm/entities/Task";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

interface IRequest {
    description?: string;
    discipline?: string;
    pet?: string;
    title?: string;
    class_id?: string;
    validity?: Date;
    id?: string;
}

@injectable()
class ListTaskUseCase {
    constructor(
        @inject("TasksRepository")
        private taskRepository: TasksRepository
    ) {}

    async execute({
        description,
        discipline,
        pet,
        title,
        class_id,
        validity,
        id
    }: IRequest): Promise<Task[]> {
        const tasks = await this.taskRepository.FindTasks({
            id,
            description,
            discipline,
            pet,
            title,
            class_id,
            validity
        });

        return tasks;
    }
}

export { ListTaskUseCase }