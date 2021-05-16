import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { User } from "../../../../accounts/infra/typeorm/entities/User";
import { Task } from "../../../../task/infra/typeorm/entities/Task";
import { ClassLevelEnum } from "../../../enum/ClassEnum";

@Entity("class")
class Class {
    @PrimaryColumn()
    id: string;    
    
    @Column()
    class_name: string;
    
    @Column()
    class_level: string;
    
    @OneToMany(() => User, students => students.classe)
    students: User[];

    // @OneToMany(() => Task, type => type.classe)
    // tasks: Task[];

    @Column()
    professor_id: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuidV4();
        }
    }
}

export { Class }