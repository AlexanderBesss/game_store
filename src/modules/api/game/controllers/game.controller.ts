import { Controller, Post, Body, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

import { GameService } from '../services/game.service';
import { CreateGameDto } from '../dto/createGame.dto';
import { ResponseGameDto } from '../dto/responseGame.dto';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<ResponseGameDto> {
    return await this.gameService.create(createGameDto);
  }
}
