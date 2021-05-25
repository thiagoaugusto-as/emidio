import { response } from "express";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { Class } from "../../infra/typeorm/entities/Class";
import { ClassRepository } from "../../infra/typeorm/repositories/ClassRepository";
import { IResponseClassDTO } from "../../mapper/IClassResponseDTO";

@injectable()
class ListClassUseCase {
    constructor(
        @inject("ClassRepository")
        private classRepository: ClassRepository
    ) {}

    async execute(class_id: string): Promise<IResponseClassDTO> {
        const classe = await this.classRepository.listClassByid(class_id);

        if(!classe) {
            throw new AppError("Class not found", 404)
        }

        return classe;
    }
}

export { ListClassUseCase }