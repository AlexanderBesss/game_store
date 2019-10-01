import { IGame } from './game.interface';

export interface IPublisher {
  id: number;

  name: string;

  siret: number;

  phone: string;

  games: IGame[];
}
