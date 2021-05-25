import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../../accounts/infra/typeorm/repositories/UsersRepository";
import { ClassRepository } from "../../../class/infra/typeorm/repositories/ClassRepository";
import { ICreateClassDTO } from "../../../dtos/ICreateClassDTO";
import { ICreateSendedTaskDTO } from "../../../dtos/ICreateSendedTaskDTO";
import { SendedTaskRepository } from "../../infra/typeorm/repositories/SendedTaskRepository";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

@injectable()
class CreateSendedTaskUseCase {
    constructor(
        @inject("SendedTaskRepository")
        private sendedTaskRepository: SendedTaskRepository,
        @inject("UsersRepository")
        private usersRepository: UsersRepository,
        @inject("ClassRepository")
        private classRepository: ClassRepository,
        @inject("TasksRepository")
        private tasksRepository: TasksRepository
    ) {}

    async execute({
        class_id,
        student_id,
        task_id
    }: ICreateSendedTaskDTO) {
        const userExists = this.usersRepository.findById(student_id);

        if(!userExists)
            throw new AppError("User not found!");
        
        const classExists = this.classRepository.listClassByid(class_id);

        if(!classExists)
            throw new AppError("Class not found!");

        const taskExists = this.classRepository.listClassByid(task_id);

        if(!taskExists)
            throw new AppError("Task not found!");

        const sendedTask = await this.sendedTaskRepository.create({
            class_id,
            student_id,
            task_id,
        });

        return sendedTask;
    }
} 

export { CreateSendedTaskUseCase }