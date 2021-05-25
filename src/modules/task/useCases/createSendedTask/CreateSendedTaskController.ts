import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSendedTaskUseCase } from "./CreateSendedTaskUseCase";

class CreateSendedTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            class_id,
            student_id,
            task_id
        } = request.body;

        const createSendedTaskUseCase = container.resolve(CreateSendedTaskUseCase);

        const sendedTask = await createSendedTaskUseCase.execute({
            class_id,
            student_id,
            task_id
        })

        return response.status(201).json(sendedTask);
    }
}

export { CreateSendedTaskController }