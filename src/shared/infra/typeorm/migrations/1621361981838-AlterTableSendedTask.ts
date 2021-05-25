import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AlterTableSendedTask1621361981838 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sended_task" DROP COLUMN "validity"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
