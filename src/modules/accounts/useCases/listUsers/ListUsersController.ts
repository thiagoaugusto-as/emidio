import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';

class ListUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, 
            userName, 
            class_id, 
            isProfessor
        } = request.body;

        const listUserUseCase = container.resolve(ListUsersUseCase);

        const users = await listUserUseCase.execute(
            name, 
            userName, 
            class_id, 
            isProfessor
        );

        return response.json(users);
    }
}

export { ListUserController }