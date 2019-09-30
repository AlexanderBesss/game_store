import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Publisher } from './publisher.entity';

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 40 })
  title: string;

  @Column({ default: 0 })
  price: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @ManyToOne(type => Publisher, publisher => publisher.games)
  publisher: Publisher;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
  releaseDate: Date;
}
