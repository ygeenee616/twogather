import { Reservation } from 'src/reservations/entities/reservation.entity';
import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Hashtag } from 'src/hashtags/entities/hashtag.entity';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  @ApiProperty({ description: 'space의 카테고리' })
  type: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  @ApiProperty({ description: '주소' })
  address: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiProperty({ description: 'space 이름' })
  name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @ApiProperty({ description: '공지사항' })
  notice: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  @ApiProperty({ description: 'space 소개' })
  intro: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    eager: false,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  // @ApiProperty({ description: 'FK. user의 Id' })
  user: User;

  @OneToMany(() => Hashtag, (hashtag) => hashtag.space, { eager: true })
  @ApiProperty({ description: 'hastag와의 관계' })
  hashtags: Hashtag[];
}
