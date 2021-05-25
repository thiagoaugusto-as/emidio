import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateTaskUseCase } from "./UpdateTaskUseCase";

class UpdateTaskController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            class_id,
            description,
            discipline,
            pet,
            title,
            validity
        } = request.body;

        const { id } = request.params;

        
        const updateTaskUseCase = container.resolve(UpdateTaskUseCase);
        
        const task = await updateTaskUseCase.execute({
            task_id: id,
            class_id,
            description,
            discipline,
            pet,
            title,
            validity
        });

        return response.json(task);
    }
} 

export { UpdateTaskController }