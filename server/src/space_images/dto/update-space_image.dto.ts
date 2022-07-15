import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CreateSpaceImageDto } from './create-space_image.dto';

export class UpdateSpaceImageDto extends PartialType(CreateSpaceImageDto) {
  @IsString()
  @ApiProperty({ description: 'space 이미지 URL' })
  readonly imageUrl: string;
}
