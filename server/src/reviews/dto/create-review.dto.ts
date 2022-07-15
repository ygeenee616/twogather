import { IsString } from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ description: '리뷰 생성 시간' })
  createdTime: Date;

  @IsString()
  @ApiProperty({ description: '리뷰 내용' })
  readonly content: string;
}
