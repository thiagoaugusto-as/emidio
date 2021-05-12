import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateClass1620777157876 implements MigrationInterface {

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
                        name: "students_id",
                        type: "uuid",
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
                        columnNames: ["students_id"],
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
