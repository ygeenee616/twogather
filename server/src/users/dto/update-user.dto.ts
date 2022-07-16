import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

// UpdateUserDto는 CreateMovieDto와 인터페이스 동일하나 필수 값이 아니다
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @ApiProperty({ description: '이메일' })
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: '비밀번호(4~20자)' })
  readonly password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  @ApiProperty({ description: '닉네임(2~10자)' })
  readonly nickname: string;
}
