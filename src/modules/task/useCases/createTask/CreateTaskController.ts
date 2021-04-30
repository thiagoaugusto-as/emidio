import { Request, Response } from "express";
import { container } from "tsyringe";
import { ICreateTaskDTO } from "../../../dtos/ICreateTaskDTO";
import { CreateTaskUseCase } from "./CreateTaskUseCase";

class CreateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            description,
            discipline,
            pet,
            title
        }: ICreateTaskDTO = request.body;

        const createTaskUseCase = container.resolve(CreateTaskUseCase);

        const user = await createTaskUseCase.execute({
            description,
            discipline,
            pet,
            title
        });

        return response.status(201).json(user);
    }
}

export { CreateTaskController }