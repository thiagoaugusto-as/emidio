import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Task } from "../../infra/typeorm/entities/Task";
import { SendedTaskRepository } from "../../infra/typeorm/repositories/SendedTaskRepository";
import { TasksRepository } from "../../infra/typeorm/repositories/TasksRepository";

interface IRequest {
    class_id: string;
    student_id:  string;
}

interface IResponse {
    task: Task;
    sended:  boolean;
    avaliation: string;
}

@injectable()
class ListTasksWithCompleteInfoUseCase {
    constructor(
        @inject("TasksRepository")
        private taskRepository: TasksRepository,
        @inject("SendedTaskRepository")
        private sendedTaskRepository: SendedTaskRepository,
    ) {}

    async execute({
        class_id,
        student_id
    }: IRequest): Promise<IResponse[]> {
        let tasksWithCompletedInfo: IResponse[] = [];

        const tasks = await this.taskRepository.FindTasks({
            class_id
        });

        if (!!!tasks) {
            throw new AppError("Tarefas para essa classe não encontradas");
        }

        const sendedTasksUser = await this.sendedTaskRepository.list({
            student_id
        });

        tasks.map((task) => {
            let taskInfoAux = {task, sended: false, avaliation: ""};
            
            sendedTasksUser.map((sendedTask) => {
                if(task.id === sendedTask.task_id) {
                    taskInfoAux.sended=true;
                    
                    if(sendedTask.avaliation) {
                        taskInfoAux.avaliation=sendedTask.avaliation;
                    } 
                }
            });

            tasksWithCompletedInfo.push(taskInfoAux);
        });

        return tasksWithCompletedInfo;
    }
}

export { ListTasksWithCompleteInfoUseCase }