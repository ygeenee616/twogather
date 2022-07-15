import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoomDto {
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
