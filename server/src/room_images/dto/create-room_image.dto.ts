import { IsEmail } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoomImageDto {
  @IsEmail()
  @ApiProperty({ description: '룸 이미지 URL' })
  readonly imageUrl: string;
}
