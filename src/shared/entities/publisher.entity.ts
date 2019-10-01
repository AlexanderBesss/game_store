import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';

import { Game } from './game.entity';
import { IPublisher } from './intefaces/publisher.interface';

@Entity()
export class Publisher implements IPublisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column({ type: 'bigint', default: 0 })
  siret: number;

  @Column()
  phone: string;

  @OneToMany(type => Game, game => game.publisher, { nullable: true })
  games: Game[];
}
