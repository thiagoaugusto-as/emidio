import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateClass1619468280045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "class",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "student_id",
                        type: "uuid",
                        isUnique: true
                    },
                    {
                        name: "professor_id",
                        type: "uuid",
                    },
                    {
                        name: "class_name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "class_level",
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
                        name: "FKStudentID",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["student_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKProfessorID",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["professor_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("class")
    }

}
