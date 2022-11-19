import { PartialType } from '@nestjs/mapped-types';
import { CreateQnaDto } from './create-qna.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateQnaDto extends PartialType(CreateQnaDto) {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Q&A 내용' })
  readonly content: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ description: 'Q&A 답글' })
  readonly reply: string;
}
