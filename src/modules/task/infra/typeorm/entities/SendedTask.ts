import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"

@Entity("sended_task")
class SendedTask {
    @PrimaryColumn()
    id: string;

    @Column()
    sended: boolean;
    
    @Column()
    avaliation: string;
    
    @Column()
    task_id: string;

    @Column()
    student_id: string;

    @Column()
    class_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }

        this.sended = false;
    }
}

export { SendedTask }