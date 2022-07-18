import { ApiProperty } from '@nestjs/swagger';
import { Review } from 'src/reviews/entities/review.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Space } from 'src/spaces/entities/spaces.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ description: '시작 시간' })
  startTime: number;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ description: '종료 시간' })
  endTime: number;

  @Column({ type: 'date', nullable: false })
  @ApiProperty({ description: '예약 날짜' })
  date: Date;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ description: '예약 인원' })
  personnel: number;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdTime: Date;

  @ManyToOne((type) => User, (user) => user.reservations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  user: User;

  @OneToOne((type) => Review, (rewiew) => rewiew.reservation, {
    eager: true,
  })
  review: Review;

  @ManyToOne((type) => Room, (room) => room.reservations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  room: Room;
}
