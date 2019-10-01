import {
  Controller,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { GameService } from '../services/game.service';
import { CreateGameDto } from '../dto/createGame.dto';
import { ResponseGameDto } from '../dto/responseGame.dto';
import { ParamIdValidationPipe } from '../pipes/param-id-validation.pipe';
import { UpdateGameDto } from '../dto/updateGame.dto';
import { ResponsePublisherDto } from '../dto/responsePublisher.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

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

  @Patch(':id')
  async updateGame(
    @Param('id', ParamIdValidationPipe) id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<ResponseGameDto> {
    return await this.gameService.updateGame(id, updateGameDto);
  }

  @Delete(':id')
  async deleteGame(@Param('id', ParamIdValidationPipe) id: string): Promise<ResponseGameDto> {
    return await this.gameService.delete(id);
  }

  @Get(':id/publisher')
  async getPublisher(@Param('id', ParamIdValidationPipe) id: string): Promise<ResponsePublisherDto> {
    return await this.gameService.getPublisher(id);
  }
}
