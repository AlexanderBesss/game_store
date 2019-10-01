import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameModule } from './api/game/game.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/services/config.service';

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
        synchronize: true,
      }),
    }),
    GameModule,
    ConfigModule,
  ],
})
export class AppModule {}
