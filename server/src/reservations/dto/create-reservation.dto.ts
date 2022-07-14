import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString } from 'class-validator';
export class CreateReservationDto {
  @IsNumber()
  @ApiProperty({ description: '시작 시간' })
  startTime: number;

  @IsNumber()
  @ApiProperty({ description: '종료 시간' })
  endTime: number;

  @IsDateString()
  @ApiProperty({ description: '예약 날짜' })
  date: Date;

  @IsNumber()
  @ApiProperty({ description: '예약 인원' })
  personnel: number;

  @IsNumber()
  @ApiProperty({ description: '공간 ID' })
  spaceId: number;
}
