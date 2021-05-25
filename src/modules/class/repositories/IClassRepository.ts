import { ICreateClassDTO } from "../../dtos/ICreateClassDTO";
import { Class } from "../infra/typeorm/entities/Class";
import { IResponseClassDTO } from "../mapper/IClassResponseDTO";

export interface IFindClass {
    id?: string;
    class_level?: string;
    class_name?: string;
    created_at?: Date;
    professor_id?: string;
}
interface IClassRepository {
    create(data: ICreateClassDTO): Promise<IResponseClassDTO>
    listClassByid(class_id: string): Promise<IResponseClassDTO>
    findClass(data: IFindClass): Promise<Class[]>
}

export { IClassRepository }