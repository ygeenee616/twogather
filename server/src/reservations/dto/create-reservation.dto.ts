import { IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @IsString()
  @ApiProperty({ description: '예약 시작 시간' })
  readonly startTime: string;

  @IsString()
  @ApiProperty({ description: '예약 종료 시간' })
  readonly endTime: string;

  @ApiProperty({ description: '예약 날짜' })
  readonly date: Date;

  @ApiProperty({ description: '해당 칼럼 생성 시간' })
  readonly createdTime: Date;
}
