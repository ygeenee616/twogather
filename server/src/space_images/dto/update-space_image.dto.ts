import { PartialType } from '@nestjs/mapped-types';
import { CreateSpaceImageDto } from './create-space_image.dto';

export class UpdateSpaceImageDto extends PartialType(CreateSpaceImageDto) {}
