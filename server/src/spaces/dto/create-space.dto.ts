import { IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateSpaceDto {
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
