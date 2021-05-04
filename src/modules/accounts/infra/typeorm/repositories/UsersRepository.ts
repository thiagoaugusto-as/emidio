import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../../dtos/ICreateUserDTO";
import { IUserResponseDTO } from "../../../mapper/IUserResponseDTO";
import { UserMap } from "../../../mapper/UserMap";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        name,
        password,
        userName,
        avatar,

    }: ICreateUserDTO): Promise<IUserResponseDTO> {
        const user = this.repository.create({
            name,
            password,
            userName,
            avatar
        });

        await this.repository.save(user);

        const userResponse = UserMap.toDTO(user)

        return userResponse;
    }

    async findByUserName(userName: string): Promise<User> {
        const user = await this.repository.findOne({userName})

        return user;
    }

    async findById(user_id: string): Promise<User> {
        const user = await this.repository.findOne({id: user_id})

        return user;
    }
}

export { UsersRepository }