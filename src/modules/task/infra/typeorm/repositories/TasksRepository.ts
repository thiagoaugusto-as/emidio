import { getRepository, QueryBuilder, Repository } from "typeorm";
import { ICreateTaskDTO } from "../../../../dtos/ICreateTaskDTO";
import { IFindTasks, ITasksRepository } from "../../../repositories/ITaskRepository";
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

    async FindTasks({
        description,
        discipline,
        pet,
        title,
        class_id,
        validity,
        id
    }: IFindTasks): Promise<Task[]> {
        const taskQuery = this.repository.createQueryBuilder("t")

        if(id)
            taskQuery.andWhere("t.id = :id", { id });
        
        if(description)
            taskQuery.andWhere("t.description = :description", { description });

        if(discipline)
            taskQuery.andWhere("t.discipline = :discipline", { discipline });

        if(pet)
            taskQuery.andWhere("t.pet = :pet", { pet });

        if(title)
            taskQuery.andWhere("t.title = :title", { title });

        if(class_id)
            taskQuery.andWhere("t.class_id = :class_id", { class_id });

        if(validity)
            taskQuery.andWhere("t.validity = :validity", { validity });

        const tasks = await taskQuery.getMany();

        return tasks;
    }

    async UpdateTask(task: Task): Promise<Task> {
        const taskUpdated = this.repository.create(task);

        await this.repository.save(taskUpdated);

        return taskUpdated;
    }
}

export { TasksRepository };