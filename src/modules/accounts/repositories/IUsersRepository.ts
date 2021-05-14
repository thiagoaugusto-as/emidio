import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../mapper/IUserResponseDTO";

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUserResponseDTO>;
    findByUserName(userName: string): Promise<User>;
    findById(user_id: string): Promise<User>;
    findByIds(user_ids: string[]): Promise<User[]>;
}

export { IUsersRepository }