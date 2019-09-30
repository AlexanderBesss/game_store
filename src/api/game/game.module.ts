import { Module } from '@nestjs/common';
import { GameService } from './services/game.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Game } from '../../shared/entities/game.entity';
import { Publisher } from '../../shared/entities/publisher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Game, Publisher])],
  providers: [GameService],
})
export class GameModule {}
