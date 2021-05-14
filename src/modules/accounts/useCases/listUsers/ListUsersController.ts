import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListUsersUseCase } from './ListUsersUseCase';

class ListUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.body;

        const listUserUseCase = container.resolve(ListUsersUseCase);

        const user = await listUserUseCase.execute(user_id);

        return response.json(user);
    }
}

export { ListUserController }