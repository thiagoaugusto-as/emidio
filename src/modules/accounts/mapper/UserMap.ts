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

    static usersToDTO(users: User[]): IUserResponseDTO[] {
        const userReturn: IUserResponseDTO[] = [];

        users.map(user => {
            userReturn.push({
                    id: user.id,
                    avatar: user.avatar,
                    class_id: user.class_id,
                    isAdmin: user.isAdmin,
                    isProfessor: user.isProfessor,
                    name: user.name,
                    userName: user.userName
            })
        })

        return userReturn;
    }
}

export { UserMap }