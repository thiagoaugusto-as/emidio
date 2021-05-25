import { response } from "express";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Class } from "../../infra/typeorm/entities/Class";
import { ClassRepository } from "../../infra/typeorm/repositories/ClassRepository";
import { IResponseClassDTO } from "../../mapper/IClassResponseDTO";
import { IFindClass } from "../../repositories/IClassRepository";

@injectable()
class ListClassUseCase {
    constructor(
        @inject("ClassRepository")
        private classRepository: ClassRepository
    ) {}

    async execute({
        class_level,
        class_name,
        created_at,
        id,
        professor_id
    }: IFindClass): Promise<Class[]> {
        const classes = await this.classRepository.findClass({
            class_level,
            class_name,
            created_at,
            id,
            professor_id
        });

        if(!classes) {
            throw new AppError("Class not found", 404)
        }

        return classes;
    }
}

export { ListClassUseCase }