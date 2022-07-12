import { IsString } from 'class-validator';

export class CreateReviewDto {
  createdTime: Date;

  @IsString()
  readonly content: string;
}
