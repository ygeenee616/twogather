import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  type: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  notice: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  intro: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'hostId', referencedColumnName: 'id' })
  user: User;
}
