import { MigrationInterface, QueryRunner } from "typeorm";

export class BakeryImageNull1700143810862 implements MigrationInterface {
    name = 'BakeryImageNull1700143810862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bakery\` CHANGE \`image\` \`image\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`bakery\` CHANGE \`image\` \`image\` varchar(255) NOT NULL`);
    }

}
