import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTaskFilesUseCase } from "./ListTaskFilesUseCase";

class ListTaskFilesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            id,
            user_id,
            file_name,
            sended_task_id,
            task_id
        } = request.body;

        const listTaskFilesUseCase = container.resolve(ListTaskFilesUseCase);

        const taskFiles = await listTaskFilesUseCase.execute({
            id,
            user_id,
            file_name,
            sended_task_id,
            task_id
        });

        return response.json(taskFiles);
    }
}

export { ListTaskFilesController }