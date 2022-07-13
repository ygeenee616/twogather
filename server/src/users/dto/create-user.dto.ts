import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: '닉네임' })
  readonly nickname: string;

  @IsString()
  @ApiProperty({ description: '이메일' })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: '비밀번호' })
  readonly password: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '이름' })
  readonly name: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '성별' })
  readonly sex: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '프로필 이미지 URL' })
  readonly profileImage: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '휴대번호' })
  readonly phoneNumber: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: '사업자 등록번호' })
  readonly businessNumber: string;
}
