import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime', nullable: false })
  createdTime: Date;

  @Column({ type: 'varchar', nullable: false })
  content: string;

  @OneToOne(() => Reservation)
  @JoinColumn({ name: 'reservationId', referencedColumnName: 'id' })
  reservation: Reservation;
}
