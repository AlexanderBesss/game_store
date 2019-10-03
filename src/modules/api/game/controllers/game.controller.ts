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
import { ApiUseTags, ApiResponse, ApiNotFoundResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiUseTags('games')
@UseInterceptors(ClassSerializerInterceptor)
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @ApiResponse({
    status: 201,
    description: 'actualize games.',
    type: [ResponseGameDto],
  })
  @Post('actualize')
  async actualizeGames(): Promise<ResponseGameDto[]> {
    return this.gameService.actualize();
  }

  @ApiResponse({
    status: 201,
    description: 'create a game.',
    type: ResponseGameDto,
  })
  @ApiNotFoundResponse({ description: 'publisher not found.' })
  @ApiBadRequestResponse({ description: 'invalid input data' })
  @Post()
  async create(@Body() createGameDto: CreateGameDto): Promise<ResponseGameDto> {
    return await this.gameService.create(createGameDto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of all games.',
    type: [ResponseGameDto],
  })
  @Get()
  async getGames(): Promise<ResponseGameDto[]> {
    return await this.gameService.getGames();
  }

  @ApiResponse({
    status: 200,
    description: 'get game by id.',
    type: ResponseGameDto,
  })
  @ApiNotFoundResponse({ description: 'game not found.' })
  @ApiBadRequestResponse({ description: 'invalid game id.' })
  @Get(':id')
  async getGame(@Param('id', ParamIdValidationPipe) id: string): Promise<ResponseGameDto> {
    return await this.gameService.getGame(id);
  }

  @ApiResponse({
    status: 200,
    description: 'update a game.',
    type: ResponseGameDto,
  })
  @ApiNotFoundResponse({ description: 'game not found.' })
  @ApiBadRequestResponse({ description: 'invalid game id.' })
  @Patch(':id')
  async updateGame(
    @Param('id', ParamIdValidationPipe) id: string,
    @Body() updateGameDto: UpdateGameDto,
  ): Promise<ResponseGameDto> {
    return await this.gameService.updateGame(id, updateGameDto);
  }

  @ApiResponse({
    status: 200,
    description: 'delete a game.',
    type: ResponseGameDto,
  })
  @ApiBadRequestResponse({ description: 'invalid game id.' })
  @ApiNotFoundResponse({ description: 'game not found.' })
  @Delete(':id')
  async deleteGame(@Param('id', ParamIdValidationPipe) id: string): Promise<ResponseGameDto> {
    return await this.gameService.delete(id);
  }

  @ApiResponse({
    status: 200,
    description: 'get game publisher.',
    type: ResponsePublisherDto,
  })
  @ApiBadRequestResponse({ description: 'invalid game id.' })
  @ApiNotFoundResponse({ description: 'game not found.' })
  @Get(':id/publisher')
  async getPublisher(@Param('id', ParamIdValidationPipe) id: string): Promise<ResponsePublisherDto> {
    return await this.gameService.getPublisher(id);
  }
}
