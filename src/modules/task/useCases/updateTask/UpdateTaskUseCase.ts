import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ClassRepository } from "../../../class/infra/typeorm/repositories/ClassRepository";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

interface IUpdateTaskUseCase {
    task_id: string,
    discipline?: string;
    description?: string;
    title?: string;
    pet?: "1"|"2"|"3";
    validity?: Date;
    class_id?: string;
}

@injectable()
class UpdateTaskUseCase {
    constructor(
        @inject("TasksRepository")
        private taskRepository: TasksRepository,
        @inject("ClassRepository")
        private classRepository: ClassRepository
    ) {}

    async execute({
        task_id,
        class_id,
        description,
        discipline,
        pet,
        title,
        validity
    }: IUpdateTaskUseCase) {
        const task = await this.taskRepository.FindById(task_id)

        if(!task)
            throw new AppError("Task not found", 404)

        if(class_id) {
            const classExists = this.classRepository.listClassByid(class_id);
            
            if(!classExists) {
                throw new AppError("Class id does not exists");
            }

            task.class_id = class_id;            
        }

        if(description) {
            task.description = description;
        }

        if(discipline) {
            task.discipline = discipline;
        }

        if(pet) {
            task.pet = pet;
        }

        if(title) {
            task.title = title;
        }

        if(validity) {
            task.validity = validity;
        }

        const taskUpdated = await this.taskRepository.UpdateTask(task);

        return taskUpdated;
    }
}

export { UpdateTaskUseCase }
