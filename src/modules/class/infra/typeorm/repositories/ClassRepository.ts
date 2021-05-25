import { getRepository, Repository } from "typeorm";
import { ICreateClassDTO } from "../../../../dtos/ICreateClassDTO";
import { ClassMap } from "../../../mapper/ClassMap";
import { IResponseClassDTO } from "../../../mapper/IClassResponseDTO";
import { IClassRepository, IFindClass } from "../../../repositories/IClassRepository";
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

    async findClass({
        class_level,
        class_name,
        created_at,
        id,
        professor_id
    }: IFindClass): Promise<Class[]> {
        const classQuery = this.repository.createQueryBuilder("c")
        
        if(id)
            classQuery.andWhere("c.id = :id", { id });

        if(class_level)
            classQuery.andWhere("c.class_level = :class_level", { class_level });

        if(class_name)
            classQuery.andWhere("c.class_name = :class_name", { class_name });

        if(created_at)
            classQuery.andWhere("c.title = :title", { created_at });

        if(created_at)
            classQuery.andWhere("c.created_at = :created_at", { created_at });

        if(professor_id)
            classQuery.andWhere("c.validity = :validity", { professor_id });

        const classes = await classQuery.getMany();

        return classes;
    }
}

export { ClassRepository }