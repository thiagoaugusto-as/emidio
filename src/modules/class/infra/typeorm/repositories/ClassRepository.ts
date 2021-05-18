import { getRepository, Repository } from "typeorm";
import { ICreateClassDTO } from "../../../../dtos/ICreateClassDTO";
import { ClassMap } from "../../../mapper/ClassMap";
import { IResponseClassDTO } from "../../../mapper/IClassResponseDTO";
import { IClassRepository } from "../../../repositories/IClassRepository";
import { Class } from "../entities/Class";

class ClassRepository implements IClassRepository {
    private repository: Repository<Class>

    constructor() {
        this.repository = getRepository(Class);
    }

    async create({
        class_level,
        class_name,
        professor_id
    }: ICreateClassDTO): Promise<IResponseClassDTO> {
        const classCreated = this.repository.create({
            class_level,
            class_name,
            professor_id
        });
        
        await this.repository.save(classCreated);

        const classReturn = ClassMap.toDto(classCreated);

        return classReturn;
    }

    async listClassByid(class_id: string): Promise<IResponseClassDTO> {
        const classFind = await this.repository.findOne({id: class_id});

        return classFind;
    }
}

export { ClassRepository }