import { PartialType } from '@nestjs/swagger';
import { CreateNoticeDto } from './create-notice.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {
  @IsString()
  @ApiProperty({ description: '공지사항 제목' })
  readonly title: string;

  @IsString()
  @ApiProperty({ description: '공지사항 내용' })
  readonly content: string;
}
