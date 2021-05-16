import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "./IUserResponseDTO";
import { classToClass } from "class-transformer";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UserMap {
    static toDTO({
        id,
        name,
        userName,
        avatar,
        isProfessor,
        isAdmin,
        class_id
    }): IUserResponseDTO {
        const user = classToClass({
            id,
            name,
            userName,
            avatar,
            isProfessor,
            isAdmin,
            class_id
        })

        return user;
    }
}

export { UserMap }