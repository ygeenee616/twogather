import { PartialType } from '@nestjs/mapped-types';
import { CreateQnaDto } from './create-qna.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateQnaDto extends PartialType(CreateQnaDto) {
  @IsString()
  @ApiProperty({ description: 'Q&A 내용' })
  readonly content: string;

  @IsString()
  @ApiPropertyOptional({ description: 'Q&A 답글' })
  reply: string;
}
