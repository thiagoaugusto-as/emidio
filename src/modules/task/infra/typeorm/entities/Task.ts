import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"

@Entity("tasks")
class Task {
    @PrimaryColumn()
    id: string;

    @Column()
    discipline: string;

    @Column()
    description: string;

    @Column()
    pet: string;

    @Column()
    title: string;

    @CreateDateColumn()
    created_at: string;

    @CreateDateColumn()
    updated_at: string;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Task }