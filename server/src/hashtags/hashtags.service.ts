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
    console.log(space);
    return this.hashtagsRepository.save({
      ...createHashtagDto,
      space: space,
    });
  }

  findAll() {
    return this.hashtagsRepository.find();
  }

  findOne(id: number) {
    return this.hashtagsRepository.findOne({ where: { id } });
  }

  update(id: number, updateHashtagDto: UpdateHashtagDto) {
    return `This action updates a #${id} hashtag`;
  }

  remove(id: number) {
    return `This action removes a #${id} hashtag`;
  }
}
