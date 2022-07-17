import { Space } from 'src/spaces/entities/spaces.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

@Entity()
export class Qna {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'datetime', nullable: false })
  @ApiProperty({ description: 'Q&A 작성 시간' })
  createdTime: Date;

  @Column({ type: 'varchar', length: 400 })
  @ApiProperty({ description: 'Q&A 내용' })
  content: string;

  @Column({ type: 'varchar', length: 400, nullable: true })
  @ApiPropertyOptional({ description: 'Q&A 답글' })
  reply: string;

  @ManyToOne(() => Space, (space) => space.qnas, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'spaceId', referencedColumnName: 'id' })
  @ApiProperty({ description: 'Q&A가 달린 Space의 Id', type: () => Space })
  space: Space;

  @ManyToOne(() => User, (user) => user.qnas, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ApiProperty({ description: 'Q&A 작성자' })
  user: User;
}
