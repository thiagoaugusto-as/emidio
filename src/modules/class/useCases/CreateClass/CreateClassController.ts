import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClassUseCase } from "./CreateClassUseCase";

class CreateClassController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            professor_id,
            class_name,
            class_level
        } = request.body;

        const createClassUseCase = container.resolve(CreateClassUseCase);

        const classCreated = await createClassUseCase.execute({
            professor_id,
            class_name,
            class_level
        })


        return response.status(201).json(classCreated);
    }
}

export { CreateClassController }