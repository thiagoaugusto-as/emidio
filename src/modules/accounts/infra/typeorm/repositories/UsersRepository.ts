import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../../dtos/ICreateUserDTO";
import { Task } from "../../../../task/infra/typeorm/entities/Task";
import { IUserResponseDTO } from "../../../mapper/IUserResponseDTO";
import { UserMap } from "../../../mapper/UserMap";
import { IFindUsers, IUsersRepository } from "../../../repositories/IUsersRepository";
import { IUpdateUser } from "../../../useCases/updateUser/UpdateUserUseCase";
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
        class_id
    }: ICreateUserDTO): Promise<IUserResponseDTO> {
        const user = this.repository.create({
            name,
            password,
            userName,
            avatar,
            class_id
        });

        await this.repository.save(user);

        const userResponse = UserMap.toDTO(user)

        return userResponse;
    }

    async findByUserName(userName: string): Promise<User> {
        const user = await this.repository.findOne({userName})

        return user;
    }

    async findById(user_id: string): Promise<IUserResponseDTO> {
        const user = await this.repository.findOne({id: user_id})

        const userResponse = UserMap.toDTO(user);

        return userResponse;
    }

    async findByIds(user_ids: string[]): Promise<User[]> {
        const users = await this.repository.findByIds(user_ids);

        return users;
    }

    async findUsers({
        name, 
        userName, 
        class_id, 
        isProfessor
    }: IFindUsers): Promise<IUserResponseDTO[]> {
        const userQuery = this.repository.createQueryBuilder("u")

        if(name)
            userQuery.andWhere("u.name = :name", { name });

        if(userName)
            userQuery.andWhere("u.userName = :userName", { userName });

        if(class_id)
            userQuery.andWhere("u.class_id = :class_id", { class_id });

        if(isProfessor)
            userQuery.andWhere("u.isProfessor = :isProfessor", { isProfessor });

        const users = await userQuery.getMany();

        const usersReturn = UserMap.usersToDTO(users);

        return usersReturn;
    }

    async updateUser({
        avatar,
        class_id,
        user_id,
        name,
        userName
    }: IUpdateUser): Promise<User> {
        if(name) {
            await this.repository.update(user_id, {name});
        }

        if(avatar) {
            await this.repository.update(user_id, {avatar});
        }

        if(class_id) {
            await this.repository.update(user_id, {class_id});
        }

        if(userName) {
            await this.repository.update(user_id, {userName});
        }

        const user = await this.repository.findOne({id: user_id});      

        return user;
    }

}

export { UsersRepository }