import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { Game } from '../../../../shared/entities/game.entity';
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
    const gameFromDto = _.pick(createGameDto, ['title', 'releaseDate', 'price', 'tags']);
    const game = this.gameRepository.create(gameFromDto);
    game.publisher = publisher;
    return this.gameRepository.save(game);
  }

  async getGames(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  async getGame(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found.');
    }
    return game;
  }
}
