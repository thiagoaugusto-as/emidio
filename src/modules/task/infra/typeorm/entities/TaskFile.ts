import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("task_files")
class TaskFile {
    @PrimaryColumn()
    id: string;

    @Column()
    user_id: string;

    @Column()
    task_id: string;

    @Column()
    file_name: string;

    @CreateDateColumn()
    created_at: string;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { TaskFile }