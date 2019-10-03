import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThan } from 'typeorm';
import * as moment from 'moment';

import { Game } from '../../../../shared/entities/game.entity';
import { CreateGameDto } from '../dto/createGame.dto';
import { PublisherService } from '../../../publisher/services/publisher.service';
import { UpdateGameDto } from '../dto/updateGame.dto';
import { Publisher } from '../../../../shared/entities/publisher.entity';
import { FilterGameFromDto } from '../utils/filterGameFromDto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private readonly publisherService: PublisherService,
  ) {}

  async create(createGameDto: CreateGameDto): Promise<Game> {
    const publisher = await this.publisherService.findById(createGameDto.publisherId);
    const gameDataFromDto = FilterGameFromDto.filter(createGameDto);
    const game = this.gameRepository.create(gameDataFromDto);
    game.publisher = publisher;
    return this.gameRepository.save(game);
  }

  async getGames(): Promise<Game[]> {
    return this.gameRepository.find({
      releaseDate: MoreThanOrEqual(
        moment()
          .subtract(18, 'months')
          .toDate(),
      ),
    });
  }

  async getGame(id: string): Promise<Game> {
    return await this.findOne(id);
  }

  async updateGame(id: string, updateGameDto: UpdateGameDto): Promise<Game> {
    let publisher: Publisher;
    if (updateGameDto.publisherId) {
      publisher = await this.publisherService.findById(updateGameDto.publisherId);
    }
    const gameDataFromDto = FilterGameFromDto.filter(updateGameDto);
    await this.findOne(id);
    const game = this.gameRepository.create(gameDataFromDto);
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
    const game = await this.findOne(id, 'publisher');
    return game.publisher;
  }

  async actualize(): Promise<Game[]> {
    const games = await this.findNotActualGames();
    games.forEach(async game => {
      await this.gameRepository.remove(game);
    });
    return games;
  }

  private async findNotActualGames(): Promise<Game[]> {
    const games = await this.gameRepository.find({
      releaseDate: LessThan(
        moment()
          .subtract(18, 'months')
          .toDate(),
      ),
    });
    return games;
  }

  private async findOne(id: string, relation?: string): Promise<Game> {
    const relations = relation ? [relation] : [];
    const game = await this.gameRepository.findOne({
      where: {
        id,
        releaseDate: MoreThanOrEqual(
          moment()
            .subtract(18, 'months')
            .toDate(),
        ),
      },
      relations,
    });
    if (!game) {
      throw new NotFoundException('Game not found.');
    }
    return game;
  }
}
