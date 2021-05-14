import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTasks1619468280047 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "tasks",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "discipline",
                        type: "varchar"
                    },
                    {
                        name: "pet",
                        type: "varchar"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "title",
                        type: "varchar"
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
                        name: "FKClass",
                        referencedTableName: "class",
                        referencedColumnNames: ["id"],
                        columnNames: ["class_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tasks")
    }

}
