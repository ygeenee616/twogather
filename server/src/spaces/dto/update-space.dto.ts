import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateSpaceDto } from './create-space.dto';

export class UpdateSpaceDto extends PartialType(CreateSpaceDto) {
  @IsString()
  @ApiProperty({ description: '공간 이름' })
  readonly name: string;

  @IsString()
  @ApiProperty({ description: '공간 주소1' })
  readonly address1: string;

  @IsString()
  @ApiProperty({ description: '공간 주소2' })
  readonly address2: string;

  @IsString()
  @ApiProperty({ description: '공간 주소3' })
  readonly address3: string;

  @IsString()
  @ApiProperty({ description: '공간 유형' })
  readonly type: string;

  @IsString()
  @ApiProperty({ description: '공간 유의사항' })
  readonly notice: string;

  @IsString()
  @ApiProperty({ description: '공간 소개' })
  readonly intro: string;
}
