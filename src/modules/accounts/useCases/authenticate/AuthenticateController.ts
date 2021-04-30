import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUseCase } from "./AuthenticateUseCase";
class AuthenticateCotroller {
    async handle(request: Request, response: Response): Promise<Response> {
        const { password, username } = request.body;

        const authenticateUseCase = container.resolve(AuthenticateUseCase);

        const token = await authenticateUseCase.execute({password, username});

        return response.json(token);
    }
}

export { AuthenticateCotroller };