import { getRepository, Repository } from "typeorm";
import { ICreateSendedTaskDTO } from "../../../../dtos/ICreateSendedTaskDTO";
import { IFindSendedTask, ISendedTaskRepository } from "../../../repositories/ISendedTaskRepository";
import { SendedTask } from "../entities/SendedTask";

class SendedTaskRepository implements ISendedTaskRepository {
    private repository: Repository<SendedTask>

    constructor() {
        this.repository = getRepository(SendedTask);
    }

    async create({
        class_id,
        student_id,
        task_id
    }: ICreateSendedTaskDTO): Promise<SendedTask> {
        const sendedTask = this.repository.create({
            class_id,
            student_id,
            task_id
        });

        const sendedTaskCreated = await this.repository.save(sendedTask);

        return sendedTaskCreated;
    }

    async list({
        id,
        class_id,
        avaliation,
        sended,
        student_id,
        task_id
    }: IFindSendedTask): Promise<SendedTask[]> {
        const taskSendedQuery = this.repository.createQueryBuilder("t")
        
        if(id)
            taskSendedQuery.andWhere("t.id = :id", { id });

        if(avaliation)
            taskSendedQuery.andWhere("t.avaliation = :avaliation", { avaliation });

        if(sended)
            taskSendedQuery.andWhere("t.sended = :sended", { sended });

        if(student_id)
            taskSendedQuery.andWhere("t.student_id = :student_id", { student_id });

        if(class_id)
            taskSendedQuery.andWhere("t.class_id = :class_id", { class_id });

        if(task_id)
            taskSendedQuery.andWhere("t.task_id = :task_id", { task_id });

        const tasksSended = await taskSendedQuery.getMany();

        return tasksSended;
    }
}

export { SendedTaskRepository }