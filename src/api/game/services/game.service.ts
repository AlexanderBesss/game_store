import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Game } from '../../../shared/entities/game.entity';
import { CreateGameDto } from '../dto/createGame.dto';
import { PublisherService } from '../../../publisher/services/publisher.service';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private readonly publisherService: PublisherService,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const publisher = await this.publisherService.findById(createGameDto.publisherId);
    const game = new Game();
    game.publisher = publisher;
    game.price = createGameDto.price;
    game.releaseDate = createGameDto.releaseDate;
    game.tags = createGameDto.tags;
    game.title = createGameDto.title;
    return this.gameRepository.save(game);
  }
}
