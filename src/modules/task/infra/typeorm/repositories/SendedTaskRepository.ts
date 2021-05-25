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
        throw new Error("Method not implemented.");
    }
}

export { SendedTaskRepository }