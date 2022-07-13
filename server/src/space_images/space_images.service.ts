import { Injectable } from '@nestjs/common';
import { CreateSpaceImageDto } from './dto/create-space_image.dto';
import { UpdateSpaceImageDto } from './dto/update-space_image.dto';

@Injectable()
export class SpaceImagesService {
  create(createSpaceImageDto: CreateSpaceImageDto) {
    return 'This action adds a new spaceImage';
  }

  findAll() {
    return `This action returns all spaceImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} spaceImage`;
  }

  update(id: number, updateSpaceImageDto: UpdateSpaceImageDto) {
    return `This action updates a #${id} spaceImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} spaceImage`;
  }
}
