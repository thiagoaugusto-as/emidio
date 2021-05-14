import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddRelationOnUser1621000561865 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey("users", new TableForeignKey({
            columnNames: ["class_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "class",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("class_id") !== -1);
        await queryRunner.dropForeignKey("users", foreignKey);
    }

}
