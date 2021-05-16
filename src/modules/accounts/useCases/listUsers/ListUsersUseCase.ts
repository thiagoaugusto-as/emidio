import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute(
        name: string, 
        userName: string, 
        class_id: string, 
        isProfessor: boolean
    ): Promise<User[]> {
        const users = await this.usersRepository.findUsers(
            name, 
            userName, 
            class_id, 
            isProfessor
        );

        return users;
    }
}

export { ListUsersUseCase }