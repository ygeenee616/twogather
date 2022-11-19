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

  @Column({ type: 'varchar', nullable: false })
  @ApiProperty({ description: '예약 날짜' })
  date: string;

  @Column({ type: 'int', nullable: false })
  @ApiProperty({ description: '예약 인원' })
  personnel: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @ApiProperty({ description: '예약 유저 이름' })
  reserveUsername: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @ApiProperty({ description: '예약 연락처' })
  reservePhoneNumber: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @ApiProperty({ description: '예약 이메일' })
  reserveEmail: string;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  createdTime: Date;

  @Column({ type: 'varchar', length: 400, nullable: false })
  @ApiProperty({ description: '사용 목적' })
  purpose: string;

  @Column({ type: 'varchar', length: 400, nullable: false })
  @ApiProperty({ description: '요청 사항' })
  requirement: string;

  @Column({ type: 'varchar', length: 400, nullable: false })
  @ApiProperty({ description: '총 금액' })
  totalPrice: number;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  user: User;

  @OneToOne(() => Review, (rewiew) => rewiew.reservation, {
    eager: false,
  })
  review: Review;

  @ManyToOne(() => Room, (room) => room.reservations, {
    onDelete: 'CASCADE',
    eager: false,
  })
  room: Room;
}
