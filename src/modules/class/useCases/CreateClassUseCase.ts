import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { UsersRepository } from "../../accounts/infra/typeorm/repositories/UsersRepository";
import { ICreateClassDTO } from "../../dtos/ICreateClassDTO";
import { ClassRepository } from "../infra/typeorm/repositories/ClassRepository";
import { IResponseClassDTO } from "../mapper/IClassResponseDTO";

@injectable()
class CreateClassUseCase {
    constructor(
        @inject("ClassRepository")
        private classRepository: ClassRepository,
        @inject("UsersRepository")
        private usersRepository: UsersRepository
    ) {}

    async execute({
        class_level,
        class_name,
        professor_id
    }: ICreateClassDTO):Promise<IResponseClassDTO> {
        const professorExists = await this.usersRepository.findById(professor_id);

        if(!professorExists) {
            throw new AppError(`Professor with id ${professor_id} not exists`, 404)
        }
        
        if(!professorExists.isProfessor) {
            throw new AppError(`User with id ${professor_id} must be a professor`)
        }

        //const studentExists = await this.usersRepository.findByIds(student_id);

        const classCreated = await this.classRepository.create({
            class_level,
            class_name,
            professor_id
        })

        return classCreated;
    }
}

export { CreateClassUseCase }