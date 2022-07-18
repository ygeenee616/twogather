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

  @IsString()
  @ApiProperty({ description: '사용 목적' })
  purpose: string;

  @IsString()
  @ApiProperty({ description: '요청 사항' })
  requirement: string;

  @IsNumber()
  @ApiProperty({ description: '총 금액' })
  totalPrice: number;
}
