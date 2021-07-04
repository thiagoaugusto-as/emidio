

import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

interface IRequest {
    username: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        name: string;
        username: string;
        isProfessor: boolean;
    };
    token: string;
}

@injectable()
class AuthenticateUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository,
    ){}

    async execute({ username, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByUserName(username);

        const { expires_in_token, secret_token } = auth;

        if(!user) {
            throw new AppError("Username or password incorrect");
        };

        const passowrdMatch = await compare(password, user.password);

        if(!passowrdMatch) {
            throw new AppError("Username or password incorrect")
        };

        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.userName,
                isProfessor: user.isProfessor
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUseCase }