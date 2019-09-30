import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';
import { Game } from './game.entity';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column({ type: 'int', default: 0 })
  siret: number;

  @Column()
  phone: string;

  @OneToMany(type => Game, game => game.publisher, { nullable: true })
  games: Game[];
}
