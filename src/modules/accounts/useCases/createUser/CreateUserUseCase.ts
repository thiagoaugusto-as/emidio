import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserResponseDTO } from "../../mapper/IUserResponseDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IClassRepository } from "../../../class/repositories/IClassRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ClassRepository")
        private classRepository: IClassRepository
    ) {}

    async execute({
        name,
        password,
        userName,
        avatar,
        class_id
    }: ICreateUserDTO): Promise<IUserResponseDTO> {
        const userAlreadyExists = await this.usersRepository.findByUserName(
            userName
        );

        if(userAlreadyExists) {
           throw new AppError("User already exists!"); 
        }

        const classAlreadyExists = await this.classRepository.listClassByid(class_id);

        if(!classAlreadyExists) {
            throw new AppError("Class not found!")
        }

        const passwordHash = await hash(password, 8);

        const user = await this.usersRepository.create({
            name,
            password: passwordHash,
            userName,
            avatar,
            class_id
        });

        return user;
    }
}

export { CreateUserUseCase }