import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableSendedTask1620135329280 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "sended_task",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "task_id",
                        type: "uuid",
                    },
                    {
                        name: "files_id",
                        type: "uuid",
                    },
                    {
                        name: "student_id",
                        type: "uuid",
                    },
                    {
                        name: "rating",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "class_id",
                        type: "uuid",
                    },
                    {
                        name: "validity",
                        type: "timestamp"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKClassID",
                        referencedTableName: "class",
                        referencedColumnNames: ["id"],
                        columnNames: ["class_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKTaskID",
                        referencedTableName: "tasks",
                        referencedColumnNames: ["id"],
                        columnNames: ["task_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKStudentID",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["student_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sended_task")
    }

}
