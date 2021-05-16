import { Request, Response } from "express";
import { container } from "tsyringe";
import upload from "../../../../config/upload";
import { CreateTaskFileUseCase } from "./CreateTaskFileUseCase";

interface IFiles {
    filename: string;
}

class CreateTaskFileController {
    constructor() {}
    async handle(request: Request, response: Response): Promise<Response> {
        const { task_id, sended_task_id } = request.body;
        const { id: user_id } = request.user;
        const files = request.files as IFiles[];

        const createTaskFileUseCase = container.resolve(CreateTaskFileUseCase);

        const files_name = files.map((file) => file.filename);

        await createTaskFileUseCase.execute({
            task_id,
            files_name,
            user_id,
            sended_task_id
        })

        return response.status(201).json();
    }
}

export { CreateTaskFileController }