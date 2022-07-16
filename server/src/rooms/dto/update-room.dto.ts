import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsString()
  @ApiProperty({ description: 'room 이름' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ description: '수용 인원' })
  readonly capacity: number;

  @IsNumber()
  @ApiProperty({ description: '가격' })
  readonly price: number;

  @IsString()
  @ApiProperty({ description: '상세설명' })
  readonly description: string;
}
