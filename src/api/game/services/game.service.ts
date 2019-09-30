import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Game } from '../../../shared/entities/game.entity';
import { Publisher } from '../../../shared/entities/publisher.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(Publisher) private readonly publisherRepository: Repository<Publisher>,
  ) {}
  
}
