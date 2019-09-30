import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './api/game/game.module';

@Module({
  imports: [TypeOrmModule.forRoot(), GameModule],
})
export class AppModule {}
