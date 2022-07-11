import { PartialType } from '@nestjs/mapped-types';
import { CreateHostInfoDto } from './create-host_info.dto';

export class UpdateHostInfoDto extends PartialType(CreateHostInfoDto) {}
