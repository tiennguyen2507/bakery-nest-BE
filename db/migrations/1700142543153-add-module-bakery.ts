import { MigrationInterface, QueryRunner } from "typeorm";

export class AddModuleBakery1700142543153 implements MigrationInterface {
    name = 'AddModuleBakery1700142543153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bakery\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`size\` enum ('S', 'M', 'L') NOT NULL DEFAULT 'M', \`image\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`bakery\``);
    }

}
