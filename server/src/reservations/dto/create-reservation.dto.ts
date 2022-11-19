import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';
export class CreateReservationDto {
  @IsNumber()
  @ApiProperty({ description: '시작 시간' })
  startTime: number;

  @IsNumber()
  @ApiProperty({ description: '종료 시간' })
  endTime: number;

  @IsString()
  @ApiProperty({ description: '예약 날짜' })
  date: string;

  @IsNumber()
  @ApiProperty({ description: '예약 인원' })
  personnel: number;

  @IsString()
  @ApiProperty({ description: '예약 유저 이름' })
  reserveUsername: string;

  @IsString()
  @ApiProperty({ description: '예약 휴대폰 번호' })
  reservePhoneNumber: string;

  @IsEmail()
  @ApiProperty({ description: '예약 이메일' })
  reserveEmail: string;

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
