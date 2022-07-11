import { IsString } from 'class-validator';

export class CreateHostInfoDto {
  @IsString()
  readonly businessNumber: string;

  @IsString()
  readonly businessName: string;

  @IsString()
  readonly accountNumber: string;
}
