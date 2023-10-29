import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvaterUser1698548765299 implements MigrationInterface {
    name = 'AddAvaterUser1698548765299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`avatar\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`avatar\``);
    }

}
