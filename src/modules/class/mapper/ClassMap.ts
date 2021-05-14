import { classToClass } from "class-transformer";
import { Class } from "../infra/typeorm/entities/Class";
import { IResponseClassDTO } from "./IClassResponseDTO";

class ClassMap {
    static toDto({
        id,
        class_level,
        class_name,
        professor_id,
        created_at
    }: Class): IResponseClassDTO {
        const classToDTO = classToClass({
            id,
            class_level,
            class_name,
            professor_id,
            created_at
        });
        
        return classToDTO;
    }
}

export { ClassMap }