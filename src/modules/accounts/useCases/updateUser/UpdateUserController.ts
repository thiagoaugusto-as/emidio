import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const {
            avatar,
            class_id,
            name,
            userName
        } = request.body;

        const updateUserUseCase = container.resolve(UpdateUserUseCase);

        const user = await updateUserUseCase.execute({
            user_id: id,
            avatar,
            class_id,
            name,
            userName
        })

        return response.json(user);
    }
}

export { UpdateUserController }