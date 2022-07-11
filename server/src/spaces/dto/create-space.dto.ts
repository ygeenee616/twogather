import { IsString } from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly address: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly notice: string;

  @IsString()
  readonly intro: string;
}
