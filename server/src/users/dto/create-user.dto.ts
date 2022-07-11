import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly nickname: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly sex: string;

  @IsString()
  @IsOptional()
  readonly profileImage: string;

  @IsString()
  @IsOptional()
  readonly phoneNumber: string;

  @IsString()
  @IsOptional()
  readonly businessNumber: string;
}
