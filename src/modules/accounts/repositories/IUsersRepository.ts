import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";
import { IUserResponseDTO } from "../mapper/IUserResponseDTO";

interface IFindUsers {
    name?: string;
    userName?: string;
    class_id?: string;
    isProfessor?: boolean;
}
interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<IUserResponseDTO>;
    findByUserName(userName: string): Promise<User>;
    findById(user_id: string): Promise<IUserResponseDTO>;
    findByIds(user_ids: string[]): Promise<User[]>;
    findUsers(data: IFindUsers): Promise<IUserResponseDTO[]>
}

export { IUsersRepository, IFindUsers }