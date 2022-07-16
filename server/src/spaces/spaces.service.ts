import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/users.entity';
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

  // 전체 공간 목록 조회
  async findAll(): Promise<Space[]> {
    return await this.spacesRepository.find({
      relations: {
        user: true,
      },
      order: {
        id: 'DESC',
      },
      cache: true,
    });
  }

  // id로 공간 조회
  async findOne(id: number): Promise<Space> {
    try {
      const space = await this.spacesRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        },
        cache: true,
      });
      if (space === null) {
        throw new NotFoundException('존재하지 않는 공간입니다.');
      }
      return space;
    } catch (error) {
      throw error;
    }
  }

  // HostId로 공간 목록 조회
  async findOneByUser(hostId: number): Promise<Space[]> {
    try {
      return this.spacesRepository.find({
        where: {
          user: {
            id: hostId,
          },
        },
        cache: true,
      });
    } catch (error) {
      throw error;
    }
  }

  //type으로 공간 목록 조회
  async findByType(type: string): Promise<Space[]> {
    try {
      const spaces = await this.spacesRepository.find({
        where: {
          type,
        },
        relations: {
          user: true,
        },
        cache: true,
      });
      return spaces;
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
      return updatedSpace.affected === 1;
    } catch (error) {
      throw error;
    }
  }
  // await repository.update({ firstName: "Timber" }, { firstName: "Rizzrak" })
  // executes UPDATE user SET firstName = Rizzrak WHERE firstName = Timber

  // 내 space 수정
  async updateMySpace(
    hostId: number,
    spaceId: number,
    UpdateSpaceDto: UpdateSpaceDto,
  ) {
    try {
      const updateSpace = await this.spacesRepository.update(
        {
          user: {
            id: hostId,
          },
          id: spaceId,
        },
        UpdateSpaceDto,
      );
      console.log(updateSpace);
      return updateSpace.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  // 공간 삭제
  async remove(id: number): Promise<void> {
    try {
      const deletedSpace = await this.spacesRepository.delete(id);
      if (!deletedSpace.affected) {
        throw new NotFoundException({
          description: '삭제할 공간이 없습니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
