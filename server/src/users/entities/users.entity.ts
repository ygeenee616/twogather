import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { Space } from 'src/spaces/entities/spaces.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @Column({ type: 'boolean', default: false })
  @ApiPropertyOptional({ description: '관리자 여부' })
  isAdmin: boolean;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  @ApiProperty({ description: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '성별' })
  sex: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '프로필 사진' })
  profileImage: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '휴대폰 번호' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '사업자 등록번호' })
  businessNumber: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '사업명' })
  businessName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '사업장 주소지' })
  businessAddress: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '사업자 계좌번호' })
  accountNumber: string;

  @OneToMany((type) => Reservation, (reservation) => reservation.user, {
    eager: true,
  })
  reservations: Reservation[];

  @OneToMany((type) => Space, (space) => space.user, { eager: true })
  spaces: Space[];
}
