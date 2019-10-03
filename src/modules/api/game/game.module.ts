import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GameService } from './services/game.service';
import { Game } from '../../../shared/entities/game.entity';
import { GameController } from './controllers/game.controller';
import { PublisherModule } from '../../publisher/publisher.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), PublisherModule],
  providers: [GameService],
  controllers: [GameController],
})
export class GameModule {}
