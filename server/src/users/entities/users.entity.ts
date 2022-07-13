import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'primary key Id' })
  id: number;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  @ApiProperty({ description: '닉네임' })
  nickname: string;

  @Column({ type: 'varchar', length: 45, nullable: false, unique: true })
  @ApiProperty({ description: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  @ApiProperty({ description: '비밀번호' })
  password: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '이름' })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '성별' })
  sex: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '프로필 이미지 URL' })
  profileImage: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '휴대번호' })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '사업자 등록번호' })
  businessNumber: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '상호명' })
  businessName: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '사업장소재지' })
  businessAddress: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  @ApiPropertyOptional({ description: '계좌번호' })
  accountNumber: string;
}
