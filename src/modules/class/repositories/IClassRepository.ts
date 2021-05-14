import { ICreateClassDTO } from "../../dtos/ICreateClassDTO";
import { IResponseClassDTO } from "../mapper/IClassResponseDTO";

interface IClassRepository {
    create(data: ICreateClassDTO): Promise<IResponseClassDTO>
    listClassByid(class_id: string): Promise<IResponseClassDTO>
}

export { IClassRepository }