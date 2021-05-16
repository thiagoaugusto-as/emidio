import { getRepository, Repository } from "typeorm";
import { ICreateTaskDTO } from "../../../../dtos/ICreateTaskDTO";
import { ITasksRepository } from "../../../repositories/ITaskRepository";
import { Task } from "../entities/Task";

class TasksRepository implements ITasksRepository{
    private repository: Repository<Task>

    constructor() {
        this.repository = getRepository(Task);
    }

    async Create({
        description,
        discipline,
        pet,
        title,
        class_id,
        validity
    }: ICreateTaskDTO): Promise<Task> {
        const task = this.repository.create({
            description,
            discipline,
            pet,
            title,
            class_id,
            validity
        });

        await this.repository.save(task);

        return task;
    }

    async FindById(task_id: string): Promise<Task> {
        const task = await this.repository.findOne({id: task_id});

        return task;
    }
}

export { TasksRepository };