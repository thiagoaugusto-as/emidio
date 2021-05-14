import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { Class } from "../../../../class/infra/typeorm/entities/Class";

@Entity("users")
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    userName: string;

    @Column()
    password: string;

    @Column()
    isProfessor: boolean;

    @Column()
    isAdmin: boolean;

    @Column()
    avatar: string;

    @Column()
    class_id: string;

    @ManyToOne(() => Class, classe => classe.students, { eager: true })
    @JoinColumn({name: "class_id"})
    classe: Class;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
        this.isAdmin = false;
        this.isProfessor = false;
    }
}

export { User };