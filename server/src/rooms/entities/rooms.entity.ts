import { Space } from 'src/spaces/entities/spaces.entity';
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
export class Room {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 45 })
  @ApiProperty({ description: 'room 이름' })
  name: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: '수용 인원' })
  capacity: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: '가격' })
  price: number;

  @Column({ type: 'varchar', length: 500 })
  @ApiProperty({ description: '상세설명' })
  description: string;

  @ManyToOne(() => Space, (space) => space.rooms, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  space: Space;
}
