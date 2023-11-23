import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeCard1700750629801 implements MigrationInterface {
    name = 'ChangeCard1700750629801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`amount\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
