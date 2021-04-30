import { inject, injectable } from "tsyringe";
import { ICreateTaskDTO } from "../../../dtos/ICreateTaskDTO";
import { Task } from "../../infra/typeorm/entities/Task";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async execute({
        description,
        discipline,
        pet,
        title
    }: ICreateTaskDTO): Promise<Task> {
        const task = await this.tasksRepository.Create({
            description,
            discipline,
            pet,
            title
        });

        return task;
    }
}

export { CreateTaskUseCase }