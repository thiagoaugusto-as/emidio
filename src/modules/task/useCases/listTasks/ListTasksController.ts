import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTaskUseCase } from "./ListTasksUseCase";

interface IRequest {
    description?: string,
    discipline?: string,
    pet?: string,
    title?: string,
    class_id?: string,
    validity?: Date
}

class ListTasksController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            description,
            discipline,
            pet,
            title,
            class_id,
            validity
        }: IRequest = request.body;

        const listTasksUseCase = container.resolve(ListTaskUseCase);
        
        const tasks = await listTasksUseCase.execute({
            description,
            discipline,
            pet,
            title,
            class_id,
            validity
        })

        return response.json(tasks);
    }
}

export { ListTasksController }