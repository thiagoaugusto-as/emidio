import { User } from "../accounts/infra/typeorm/entities/User";
import { ClassLevelEnum } from "../class/enum/ClassEnum";

export interface ICreateClassDTO {
    professor_id: string;
    class_name: string;
    class_level: string;
}