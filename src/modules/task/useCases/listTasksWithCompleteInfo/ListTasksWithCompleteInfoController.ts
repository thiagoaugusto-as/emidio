import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTasksWithCompleteInfoUseCase } from "./ListTasksWithCompleteInfoUseCase";

interface IRequest {
    class_id: string;
    student_id:  string;
}

class ListTasksWithCompleteInfoController {

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            class_id,
            student_id,
        }: IRequest = request.body;

        const listTasksUseCase = container.resolve(ListTasksWithCompleteInfoUseCase);
        
        const tasks = await listTasksUseCase.execute({
            class_id,
            student_id
        });

        return response.json(tasks);
    }
}

export { ListTasksWithCompleteInfoController }