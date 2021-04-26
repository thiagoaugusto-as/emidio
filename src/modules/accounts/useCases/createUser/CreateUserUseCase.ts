import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserResponseDTO } from "../../mapper/IUserResponseDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        password,
        userName,
        avatar
    }: ICreateUserDTO): Promise<IUserResponseDTO> {
        const userAlreadyExists = await this.usersRepository.findByUserName(
            userName
        );

        if(userAlreadyExists) {
           throw new AppError("User already exists!"); 
        }

        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            userName,
            avatar
        });

        return user;
    }
}

export { CreateUserUseCase }