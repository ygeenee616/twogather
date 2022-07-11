import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { Space } from './entities/spaces.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space)
    private spacesRepository: Repository<Space>,
  ) {}

  async create(spaceData: CreateSpaceDto): Promise<Space> {
    try {
      return await this.spacesRepository.save(spaceData);
    } catch (error) {
      throw error;
    }
  }
  a;

  async findAll(): Promise<Space[]> {
    return this.spacesRepository.find();
  }

  async findOne(id: number): Promise<Space> {
    return this.spacesRepository.findOneBy({
      id,
    });
  }

  async remove(id: number): Promise<void> {
    await this.spacesRepository.delete(id);
  }
}
