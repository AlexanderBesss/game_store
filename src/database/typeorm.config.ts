import { ConfigService } from '../modules/config/services/config.service';
import { Game } from '../shared/entities/game.entity';
import { Publisher } from '../shared/entities/publisher.entity';

const config = new ConfigService();
const migrationDir = process.env.NODE_ENV === 'production' ? 'dist/database/migrations' : 'src/database/migrations';

export = {
  host: config.DB_HOST,
  type: 'mysql',
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,

  entities: [Game, Publisher],
  migrations: [`${migrationDir}/*{.ts,.js}`],
  cli: {
    migrationsDir: migrationDir,
  },

  synchronize: false,
};
