import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ClassRepository } from "../../../class/infra/typeorm/repositories/ClassRepository";
import { User } from "../../infra/typeorm/entities/User";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";
import { IUserResponseDTO } from "../../mapper/IUserResponseDTO";
import { UserMap } from "../../mapper/UserMap";

export interface IUpdateUser {
    user_id: string
    avatar?: string;
    class_id?: string;
    name?: string;
    userName?: string;
}

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository,        
        @inject("ClassRepository")
        private classRepository: ClassRepository
    ) {}

    async execute({
        user_id,
        avatar,
        class_id,
        name,
        userName
    }: IUpdateUser): Promise<IUserResponseDTO> {
        //const findUser = await this.usersRepository.findById(user_id);

        // if(!user)
        //     throw new AppError(`User with id '${user_id}' does not exists!`, 404);
        
        // if(class_id) {
        //     const classExists = this.classRepository.listClassByid(class_id);

        //     if(!classExists) {
        //         throw new AppError("This class does not exists", 404);
        //     }

        //     user.class_id = class_id;
        // }

        // if(avatar)
        //     user.avatar = avatar;

        // if(isProfessor)
        //     user.isProfessor = isProfessor;

        // if(name)
        //     user.name = name;

        // if(userName)
        //     user.userName = userName;

        const user = await this.usersRepository.updateUser({
            user_id,
            avatar,
            class_id,
            name,
            userName
        });

        const userResponse = UserMap.toDTO(user);

        return userResponse;   
    }
}

export { UpdateUserUseCase }