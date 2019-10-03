import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import * as moment from 'moment';

import { Publisher } from './publisher.entity';
import { IGame } from './intefaces/game.interface';

@Entity('games')
export class Game implements IGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  title: string;

  @Exclude()
  @Column({ type: 'float', default: 0, unsigned: true })
  price: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Exclude()
  @ManyToOne(type => Publisher, publisher => publisher.games, { nullable: true, onDelete: 'CASCADE' })
  publisher: Publisher;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  releaseDate: Date;

  @Expose({
    name: 'price',
    toPlainOnly: true,
  })
  get calculateDiscount(): number {
    if (moment().diff(this.releaseDate, 'months') >= 12 && moment().diff(this.releaseDate, 'months') <= 18) {
      return Math.round(this.price * 0.8 * 100) / 100;
    } else {
      return this.price;
    }
  }
}
