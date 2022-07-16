import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @ApiProperty({ description: '룸 이름' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ description: '룸 수용 인원' })
  capacity: number;

  @IsNumber()
  @ApiProperty({ description: '룸 가격' })
  price: number;

  @IsString()
  @ApiProperty({ description: '룸 설명' })
  description: string;
}
