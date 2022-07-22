import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailDto {
  @IsString()
  @ApiProperty({ description: '이메일 주소' })
  readonly email: string;
}
