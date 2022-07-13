import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

@Entity()
export class RoomImage {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  @ApiProperty({ description: '룸 이미지 URL' })
  imageUrl: string;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'roomId', referencedColumnName: 'id' })
  @ApiProperty({ description: 'FK. room의 Id' })
  space: Room;
}
