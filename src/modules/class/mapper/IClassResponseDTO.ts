import { User } from "../../accounts/infra/typeorm/entities/User";
import { ClassLevelEnum } from "../enum/ClassEnum";

export interface IResponseClassDTO {
    id: string;
    professor_id: string;
    class_name: string;
    class_level: string;
    created_at: Date;
}