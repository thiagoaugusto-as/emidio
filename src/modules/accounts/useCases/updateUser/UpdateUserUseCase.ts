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
        const classRepository = this.classRepository.listClassByid(class_id);

        if(!classRepository) {
            throw new AppError("Class does not exists");
        }

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