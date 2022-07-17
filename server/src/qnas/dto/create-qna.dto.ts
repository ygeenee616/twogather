import { IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQnaDto {
  @IsString()
  @ApiProperty({ description: 'Q&A 내용' })
  readonly content: string;
}
