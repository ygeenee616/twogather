import {
  Column,
  Entity,
  JoinColumn,
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

  @ManyToOne(() => Space)
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  @ApiProperty({ description: 'hashtag의 FK. space의 Id' })
  space: Space;
}
