import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { Space } from './entities/spaces.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space)
    private spacesRepository: Repository<Space>,
  ) {}

  async create(spaceData: CreateSpaceDto, user: User): Promise<Space> {
    try {
      const newSpace = {
        ...spaceData,
        user,
      };
      return await this.spacesRepository.save(newSpace);
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Space[]> {
    return await this.spacesRepository.find({
      relations: {
        user: true,
      },
      order: {
        id: 'ASC',
      },
      cache: true,
    });
  }

  // id로 공간 조회
  async findOne(id: number): Promise<Space> {
    return this.spacesRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
      cache: true,
    });
  }

  async findByType(type: string): Promise<Space[]> {
    return this.spacesRepository.find({
      where: {
        type,
      },
      relations: {
        user: true,
      },
      cache: true,
    });
  }

  // 공간 삭제
  async remove(id: number): Promise<void> {
    await this.spacesRepository.delete(id);
  }
}
