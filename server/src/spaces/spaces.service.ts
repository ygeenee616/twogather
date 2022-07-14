import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { Space } from './entities/spaces.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(Space)
    private spacesRepository: Repository<Space>,
  ) {}

  async create(spaceData: CreateSpaceDto): Promise<Space> {
    try {
      const newSpaces: Space = await this.spacesRepository.save(spaceData);
      return newSpaces;
    } catch (error) {
      throw error;
    }
  }

  // 전체 space 조회
  async findAll(): Promise<Space[]> {
    try {
      return this.spacesRepository.find();
    } catch (error) {
      throw error;
    }
  }

  // space의 id로 space 조회
  async findOne(id: number): Promise<Space> {
    try {
      return this.spacesRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw error;
    }
  }

  // join 된 userId로 생성한 Spaces 목록 가져오기
  // 아직 확실하지 않음. 어떻게 써야할 지. join 해야해서
  async findOneByUserId(user): Promise<Space[]> {
    try {
      return this.spacesRepository.findBy({
        user,
      });
    } catch (error) {
      throw error;
    }
  }

  // space 수정
  async update(id: number, UpdateSpaceDto: UpdateSpaceDto) {
    try {
      const updatedSpace = await this.spacesRepository.update(
        id,
        UpdateSpaceDto,
      );
      return updatedSpace;
    } catch (error) {
      throw error;
    }
  }

  // space 삭제
  async remove(id: number): Promise<void> {
    try {
      const deletedSpace = await this.spacesRepository.delete(id);
      if (!deletedSpace.affected) {
        throw new NotFoundException({
          description: '삭제할 space가 없습니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
