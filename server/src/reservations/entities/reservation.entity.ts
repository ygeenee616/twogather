import { Room } from 'src/rooms/entities/rooms.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: false })
  @ApiProperty({ description: '예약 시작 시간' })
  startTime: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  @ApiProperty({ description: '예약 종료 시간' })
  endTime: string;

  @Column({ type: 'date', nullable: false })
  @ApiProperty({ description: '예약 날짜' })
  date: Date;

  @Column({ type: 'datetime', nullable: false })
  @ApiProperty({ description: '해당 컬럼 생성 시간' })
  createdTime: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ApiProperty({ description: '예약한 유저의 Id' })
  user: User;

  @OneToOne(() => Room)
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  @ApiProperty({ description: '예약한 room의 Id' })
  room: Room;
}
