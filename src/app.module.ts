import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameModule } from './modules/api/game/game.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/services/config.service';
import { PublisherModule } from './modules/publisher/publisher.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql' as 'mysql',
        host: configService.DB_HOST,
        port: Number(configService.DB_PORT),
        username: configService.DB_USERNAME,
        password: configService.DB_PASSWORD,
        database: configService.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
    }),
    GameModule,
    ConfigModule,
    PublisherModule,
  ],
})
export class AppModule {}
