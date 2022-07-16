import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Space } from '../../spaces/entities/spaces.entity';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  @ApiProperty({ description: '해시태그' })
  tag: string;

  @ManyToOne((type) => Space, (space) => space.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @ApiProperty({ description: 'hashtag의 FK. space의 Id', type: () => Space })
  space: Space;
}
