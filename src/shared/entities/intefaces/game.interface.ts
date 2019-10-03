import { IPublisher } from './publisher.interface';

export interface IGame {
  id: number;

  title: string;

  price: number;

  tags: string[];

  publisher: IPublisher;

  releaseDate: Date;

  discount: number;
}
