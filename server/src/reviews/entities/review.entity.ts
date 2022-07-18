import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'datetime', nullable: false })
  @ApiProperty({ description: '리뷰 생성 시간' })
  createdTime: Date;

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ description: '리뷰 내용' })
  content: string;

  @OneToOne(() => Reservation, (reservation) => reservation.review, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'reservationId', referencedColumnName: 'id' })
  @ApiProperty({ description: 'FK. 예약의 Id', type: () => Reservation })
  reservation: Reservation;
}
