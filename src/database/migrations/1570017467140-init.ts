import {MigrationInterface, QueryRunner} from "typeorm";

export class init1570017467140 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `publishers` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(40) NOT NULL, `siret` bigint NOT NULL DEFAULT 0, `phone` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `games` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(40) NOT NULL, `price` float UNSIGNED NOT NULL DEFAULT 0, `tags` text NULL, `releaseDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, `publisherId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `games` ADD CONSTRAINT `FK_ac1293076b49d61bb4a47d8b485` FOREIGN KEY (`publisherId`) REFERENCES `publishers`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `games` DROP FOREIGN KEY `FK_ac1293076b49d61bb4a47d8b485`", undefined);
        await queryRunner.query("DROP TABLE `games`", undefined);
        await queryRunner.query("DROP TABLE `publishers`", undefined);
    }

}
