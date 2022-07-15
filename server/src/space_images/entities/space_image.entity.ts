import { Space } from 'src/spaces/entities/spaces.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

@Entity()
export class SpaceImage {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 200 })
  @ApiProperty({ description: 'space 이미지 URL' })
  imageUrl: string;

  @ManyToOne(() => Space)
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  @ApiProperty({ description: 'FK. Space의 Id' })
  space: Space;
}
