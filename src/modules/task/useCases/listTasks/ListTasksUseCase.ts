import { inject, injectable } from "tsyringe";
import { Task } from "../../infra/typeorm/entities/Task";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

interface IRequest {
    description?: string,
    discipline?: string,
    pet?: string,
    title?: string,
    class_id?: string,
    validity?: Date
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
        validity
    }: IRequest): Promise<Task[]> {
        const tasks = await this.taskRepository.FindTasks({
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