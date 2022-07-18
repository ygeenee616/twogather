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
import { User } from 'src/users/entities/users.entity';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({ description: '공지사항 제목' })
  title: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  @ApiProperty({ description: '공지사항 내용' })
  content: string;

  @ManyToOne((type) => User, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ApiProperty({ description: 'notice의 FK. user의 Id', type: () => User })
  user: User;
}
