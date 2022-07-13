import { IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;

  readonly date: Date;

  readonly createdTime: Date;
}
