import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {
  @IsString()
  @ApiProperty({ description: '공지사항 제목' })
  readonly title: string;

  @IsString()
  @ApiProperty({ description: '공지사항 내용' })
  readonly content: string;
}
