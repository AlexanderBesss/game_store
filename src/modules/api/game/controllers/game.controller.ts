import { Controller, Post, Body, ClassSerializerInterceptor, UseInterceptors, Get, Param } from '@nestjs/common';

import { GameService } from '../services/game.service';
import { CreateGameDto } from '../dto/createGame.dto';
import { ResponseGameDto } from '../dto/responseGame.dto';
import { ParamIdValidationPipe } from '../pipes/param-id-validation.pipe';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<ResponseGameDto> {
    return await this.gameService.create(createGameDto);
  }

  @Get()
  async getGames(): Promise<ResponseGameDto[]> {
    return await this.gameService.getGames();
  }

  @Get(':id')
  async getGame(@Param('id', ParamIdValidationPipe) id: string): Promise<ResponseGameDto> {
    return await this.gameService.getGame(id);
  }
}
