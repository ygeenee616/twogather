import { IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsString()
  @ApiProperty({ description: '리뷰 내용' })
  readonly content: string;
}
