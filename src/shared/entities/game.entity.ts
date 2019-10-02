import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { Publisher } from './publisher.entity';
import { IGame } from './intefaces/game.interface';

@Entity('games')
export class Game implements IGame {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  title: string;

  @Column({ default: 0, unsigned: true })
  price: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Exclude()
  @ManyToOne(type => Publisher, publisher => publisher.games, { nullable: false, onDelete: 'CASCADE' })
  publisher: Publisher;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  releaseDate: Date;

  @Exclude()
  @Column({ default: false })
  isDiscount: boolean;
}
