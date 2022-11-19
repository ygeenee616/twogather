import { User } from 'src/users/entities/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Hashtag } from 'src/hashtags/entities/hashtag.entity';
import { Room } from 'src/rooms/entities/rooms.entity';
import { Qna } from 'src/qnas/entities/qna.entity';
import { SpaceImage } from 'src/space_images/entities/space_image.entity';
import { Review } from 'src/reviews/entities/review.entity';

@Entity()
export class Space {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 30, nullable: false })
  @ApiProperty({ description: 'space의 카테고리' })
  type: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty({ description: '주소1' })
  address1: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty({ description: '주소2' })
  address2: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty({ description: '주소3' })
  address3: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiProperty({ description: 'space 이름' })
  name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @ApiProperty({ description: '공지사항' })
  notice: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @ApiProperty({ description: 'space 소개' })
  intro: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  @ApiProperty({ description: '리뷰 갯수' })
  numberOfReviews: number;

  @ManyToOne(() => User, (user) => user.spaces, {
    onDelete: 'CASCADE',
    eager: false,
  })
  user: User;

  @OneToMany(() => Hashtag, (hashtag) => hashtag.space, {
    eager: false,
  })
  @ApiPropertyOptional({ description: 'hastag와의 관계' })
  hashtags: Hashtag[];

  @OneToMany(() => Room, (room) => room.space, {
    eager: false,
  })
  @ApiPropertyOptional({ description: 'room과의 관계' })
  rooms: Room[];

  @OneToMany(() => Qna, (qna) => qna.space, {
    eager: false,
  })
  @ApiPropertyOptional({ description: 'qna와의 관계' })
  qnas: Qna[];

  @OneToMany(() => SpaceImage, (spaceImage) => spaceImage.space, {
    eager: false,
  })
  @ApiPropertyOptional({ description: 'spaceImage와의 관계' })
  spaceImages: SpaceImage[];

  @OneToMany(() => Review, (reviews) => reviews.space, {
    eager: false,
  })
  reviews: Review[];
}
