import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateTaskFiles1620135329281 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "task_files",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "task_id",
                    type: "uuid"
                },
                {
                    name: "sended_task_id",
                    type: "uuid"
                },
                {
                    name: "file_name",
                    type: "varchar"
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FKSendedTaskID",
                    referencedTableName: "sended_task",
                    referencedColumnNames: ["id"],
                    columnNames: ["sended_task_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
            ]
        }))

        await queryRunner.createForeignKey("task_files", new TableForeignKey({
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));

        await queryRunner.createForeignKey("task_files", new TableForeignKey({
            columnNames: ["task_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "tasks",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("task_files");
    }

}
