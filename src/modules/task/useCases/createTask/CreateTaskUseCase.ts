import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../../accounts/infra/typeorm/repositories/UsersRepository";
import { ClassRepository } from "../../../class/infra/typeorm/repositories/ClassRepository";
import { ICreateTaskDTO } from "../../../dtos/ICreateTaskDTO";
import { Task } from "../../infra/typeorm/entities/Task";
import { SendedTaskRepository } from "../../infra/typeorm/repositories/SendedTaskRepository";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

@injectable()
class CreateTaskUseCase {
    constructor(
        @inject("TasksRepository")
        private tasksRepository: TasksRepository,
        @inject("ClassRepository")
        private classRepository: ClassRepository,
        @inject("UsersRepository")
        private usersRepository: UsersRepository,
        @inject("SendedTaskRepository")
        private sendedTaskRepository: SendedTaskRepository
    ) {} 

    async execute({
        description,
        discipline,
        pet,
        title,
        class_id,
        validity
    }: ICreateTaskDTO): Promise<Task> {
        const classExists = await this.classRepository.listClassByid(class_id);

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

        const students = await this.usersRepository.findUsers({class_id});

        students.map(async student => {
            console.log("ops")
            await this.sendedTaskRepository.create({
                class_id,
                student_id: student.id,
                task_id: task.id
            })
        });

        return task;
    }
}

export { CreateTaskUseCase }