import { Space } from 'src/spaces/entities/space.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'int', length: 200 })
  capacity: number;

  @Column({ type: 'int', length: 200 })
  price: number;

  @Column({ type: 'varchar', length: 600 })
  description: number;

  @OneToOne((type) => Space)
  @JoinColumn({ name: 'spaceId2', referencedColumnName: 'id' })
  space: Space;
}
