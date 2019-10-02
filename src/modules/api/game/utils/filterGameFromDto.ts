import * as _ from 'lodash';

import { CreateGameDto } from '../dto/createGame.dto';
import { UpdateGameDto } from '../dto/updateGame.dto';

export class FilterGameFromDto {
  static filter(gameDto: CreateGameDto | UpdateGameDto) {
    return _.pick(gameDto, ['title', 'releaseDate', 'price', 'tags']);
  }
}
