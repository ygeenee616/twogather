import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateSpaceDto } from './create-space.dto';

export class UpdateSpaceDto extends PartialType(CreateSpaceDto) {
  @IsString()
  @ApiProperty({ description: 'space 이름' })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: 'space 주소' })
  readonly address: string;

  @IsString()
  @ApiProperty({ description: 'space 카테고리' })
  readonly type: string;

  @IsString()
  @ApiProperty({ description: '공지사항' })
  readonly notice: string;

  @IsString()
  @ApiProperty({ description: 'space 소개' })
  readonly intro: string;
}
