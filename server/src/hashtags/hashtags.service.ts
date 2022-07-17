import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpacesService } from 'src/spaces/spaces.service';
import { Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { Hashtag } from './entities/hashtag.entity';

@Injectable()
export class HashtagsService {
  constructor(
    @InjectRepository(Hashtag)
    private hashtagsRepository: Repository<Hashtag>,
    private spacesService: SpacesService,
  ) {}
  async create(createHashtagDto: CreateHashtagDto, id: number) {
    const space = await this.spacesService.findOne(id);
    return this.hashtagsRepository.save({
      ...createHashtagDto,
      space: space,
    });
  }

  findAll() {
    try {
      return this.hashtagsRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.hashtagsRepository.findOne({
        where: { id },
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

  async update(id: number, updateHashtagDto: UpdateHashtagDto) {
    try {
      return await this.hashtagsRepository.update(id, updateHashtagDto);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.hashtagsRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
