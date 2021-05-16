import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"
import { Class } from "../../../../class/infra/typeorm/entities/Class";

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

    @Column()
    class_id: string;

    @ManyToOne(() => Class, type => type.tasks, { eager: true })
    @JoinColumn({ name: "class_id" })
    classe: Class;

    @Column()
    validity: Date;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Task }