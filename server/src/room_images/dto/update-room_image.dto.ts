import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { CreateRoomImageDto } from './create-room_image.dto';

export class UpdateRoomImageDto extends PartialType(CreateRoomImageDto) {
  @IsEmail()
  @ApiProperty({ description: '룸 이미지 URL' })
  readonly imageUrl: string;
}
