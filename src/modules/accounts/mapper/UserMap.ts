import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "./IUserResponseDTO";
import { classToClass } from "class-transformer";

class UserMap {
    static toDTO({
        id,
        name,
        userName,
        avatar,
    }: User): IUserResponseDTO {
        const user = classToClass({
            id,
            name,
            userName,
            avatar
        })

        return user;
    }
}

export { UserMap }