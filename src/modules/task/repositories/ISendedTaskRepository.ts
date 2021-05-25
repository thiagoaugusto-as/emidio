import { ICreateSendedTaskDTO } from "../../dtos/ICreateSendedTaskDTO";
import { SendedTask } from "../infra/typeorm/entities/SendedTask";

interface IFindSendedTask {
    id?: string;
    task_id?: string;
    student_id?: string;
    class_id: string;
    sended?: Boolean;
    avaliation?: string;
};

interface ISendedTaskRepository {
    create(data: ICreateSendedTaskDTO): Promise<SendedTask>
    list(data: IFindSendedTask): Promise<SendedTask[]>
}

export { ISendedTaskRepository, IFindSendedTask }