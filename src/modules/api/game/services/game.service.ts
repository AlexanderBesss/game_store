import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import * as moment from 'moment';

import { Game } from '../../../../shared/entities/game.entity';
import { CreateGameDto } from '../dto/createGame.dto';
import { PublisherService } from '../../../publisher/services/publisher.service';
import { UpdateGameDto } from '../dto/updateGame.dto';
import { Publisher } from '../../../../shared/entities/publisher.entity';

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

  async delete(id: string): Promise<Game> {
    const game = await this.findOne(id);
    await this.gameRepository.delete(game.id);
    return game;
  }

  async getPublisher(id: string): Promise<Publisher> {
    const game = await this.gameRepository.findOne(id, { relations: ['publisher'] });
    if (!game) {
      throw new NotFoundException('Game not found.');
    }
    return game.publisher;
  }

  async actualize() {
    const games = await this.gameRepository.find();
    games.forEach(async game => {
      if (
        !game.isDiscount &&
        moment().diff(game.releaseDate, 'months') >= 12 &&
        (!game.isDiscount && moment().diff(game.releaseDate, 'months') <= 18)
      ) {
        game.isDiscount = true;
        game.price = game.price * 0.8;
        await this.gameRepository.update(game.id, game);
      }
      if (moment().diff(game.releaseDate, 'months') > 18) {
        await this.gameRepository.remove(game);
      }
    });
    return { success: true };
  }

  private async findOne(id: string): Promise<Game> {
    const game = await this.gameRepository.findOne(id);
    if (!game) {
      throw new NotFoundException('Game not found.');
    }
    return game;
  }
}
