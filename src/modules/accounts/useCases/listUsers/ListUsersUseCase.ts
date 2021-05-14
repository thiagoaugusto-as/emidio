import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute(user_id: string): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        return user;
    }
}

export { ListUsersUseCase }