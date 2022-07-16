import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateSpaceImageDto {
  @IsString()
  @ApiProperty({ description: 'space 이미지 URL' })
  readonly imageUrl: string;
}
