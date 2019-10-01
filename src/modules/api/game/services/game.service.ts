import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';

import { Game } from '../../../../shared/entities/game.entity';
import { CreateGameDto } from '../dto/createGame.dto';
import { PublisherService } from '../../../publisher/services/publisher.service';
import { UpdateGameDto } from '../dto/updateGame.dto';
import { Publisher } from 'src/shared/entities/publisher.entity';

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
    return await this.findOne(id);
  }

  async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    let publisher: Publisher;
    if (updateGameDto.publisherId) {
      publisher = await this.publisherService.findById(updateGameDto.publisherId);
    }
    const gameFromDto = _.pick(updateGameDto, ['title', 'releaseDate', 'price', 'tags']);
    const game = this.gameRepository.create(gameFromDto);
    if (publisher) {
      game.publisher = publisher;
    }
    await this.gameRepository.update(id, game);
    return game;
  }

  private async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found.');
    }
    return game;
  }
}
