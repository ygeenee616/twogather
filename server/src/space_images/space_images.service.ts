import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpacesService } from 'src/spaces/spaces.service';
import { Repository } from 'typeorm';
import { CreateSpaceImageDto } from './dto/create-space_image.dto';
import { UpdateSpaceImageDto } from './dto/update-space_image.dto';
import { SpaceImage } from './entities/space_image.entity';

@Injectable()
export class SpaceImagesService {
  constructor(
    @InjectRepository(SpaceImage)
    private spaceImagesRepository: Repository<SpaceImage>,
    private spaceService: SpacesService,
  ) {}

  async create(createSpaceImageDto: CreateSpaceImageDto, spaceId: number) {
    try {
      const space = await this.spaceService.findOne(spaceId);
      const newSpaceImage = {
        ...createSpaceImageDto,
        space,
      };
      return await this.spaceImagesRepository.save(newSpaceImage);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.spaceImagesRepository.find({
      relations: {
        space: true,
      },
      order: {
        id: 'DESC',
      },
      // cache: true,
    });
  }

  async findAllBySpace(spaceId: number) {
    try {
      return await this.spaceImagesRepository.find({
        where: {
          space: {
            id: spaceId,
          },
        },
        relations: {
          space: true,
        },
        order: {
          id: 'DESC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // spaceImageId로 특정 spaceImage(URL) 조회
  async findOne(id: number) {
    try {
      const spaceImage = await this.spaceImagesRepository.findOne({
        where: {
          id,
        },
        relations: {
          space: true,
        },
        // cache: true
      });
      if (spaceImage === null) {
        throw new NotFoundException('존재하지 않는 spaceImage입니다.');
      }
      return spaceImage;
    } catch (error) {
      throw error;
    }
  }

  // spaceImageId로 특정 spaceImage 수정
  async update(id: number, updateSpaceImageDto: UpdateSpaceImageDto) {
    try {
      const updatedSpaceImage = await this.spaceImagesRepository.update(
        id,
        updateSpaceImageDto,
      );
      return updatedSpaceImage.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  // spaceImageId로 특정 spaceImage 삭제
  async remove(id: number) {
    try {
      const deletedSpaceImage = await this.spaceImagesRepository.delete(id);
      if (!deletedSpaceImage.affected) {
        throw new NotFoundException({
          description: '삭제할 spaceImage가 없습니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
