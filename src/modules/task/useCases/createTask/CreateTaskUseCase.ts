import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ClassRepository } from "../../../class/infra/typeorm/repositories/ClassRepository";
import { ICreateTaskDTO } from "../../../dtos/ICreateTaskDTO";
import { Task } from "../../infra/typeorm/entities/Task";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository,
        @inject("ClassRepository")
        private classRepository: ClassRepository
    ) {}

    async execute({
        description,
        discipline,
        pet,
        title,
        class_id,
        validity
    }: ICreateTaskDTO): Promise<Task> {
        const classExists = this.classRepository.listClassByid(class_id);

        if(!classExists) {
            throw new AppError("Class not found!", 404)
        }

        const task = await this.tasksRepository.Create({
            description,
            discipline,
            pet,
            title,
            class_id,
            validity
        });

        return task;
    }
}

export { CreateTaskUseCase }