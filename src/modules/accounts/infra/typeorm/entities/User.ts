import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

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

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
        this.isAdmin = false;
        this.isProfessor = false;
        this.avatar = "123"
    }
}

export { User };