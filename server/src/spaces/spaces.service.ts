import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { reverse } from 'dns';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { FindOptionsOrder, Like, MoreThanOrEqual, Repository } from 'typeorm';
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
  async findAll(
    startIndex: number,
    perPage: number,
    keyword: string,
    dateOrder: string,
    type: string,
  ) {
    try {
      const totalSpaces = await this.spacesRepository.find();
      const totalPage = parseInt((totalSpaces.length / perPage).toString()) + 1;
      let paginatedSpaces: Array<Space>;

      // no type?
      if (type === undefined || type === null) {
        if (dateOrder === undefined || dateOrder === null) {
          // keyword?
          if (keyword === undefined || keyword === null) {
            paginatedSpaces = await this.spacesRepository.find({
              select: {
                rooms: true,
                hashtags: true,
                reviews: true,
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
                reviews: true,
              },
              order: {
                id: 'DESC',
              },
              skip: startIndex,
              take: perPage,
            });
            // not keyword?
          } else {
            paginatedSpaces = await this.spacesRepository.find({
              select: {
                rooms: true,
                hashtags: true,
                reviews: true,
              },
              where: {
                name: Like(`%${keyword}%`),
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
                reviews: true,
              },
              order: {
                id: 'DESC',
              },
              skip: startIndex,
              take: perPage,
            });
          }
        } else {
          if (keyword === undefined || keyword === null) {
            paginatedSpaces = await this.spacesRepository.find({
              select: {
                rooms: true,
                hashtags: true,
                reviews: true,
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
              },
              order: {
                id: 'ASC',
              },
              skip: startIndex,
              take: perPage,
            });
            // not keyword?
          } else {
            paginatedSpaces = await this.spacesRepository.find({
              select: {
                rooms: true,
                hashtags: true,
                reviews: true,
              },
              where: {
                name: Like(`%${keyword}%`),
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
                reviews: true,
              },
              order: {
                id: 'ASC',
              },
              skip: startIndex,
              take: perPage,
            });
          }
        }
      } else {
        // type?
        if (dateOrder === undefined || dateOrder === null) {
          // keyword?
          if (keyword === undefined || keyword === null) {
            paginatedSpaces = await this.spacesRepository.find({
              select: {
                rooms: true,
                hashtags: true,
                reviews: true,
              },
              where: {
                type,
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
                reviews: true,
              },
              order: {
                id: 'DESC',
              },
              skip: startIndex,
              take: perPage,
            });
            // not keyword?
          } else {
            paginatedSpaces = await this.spacesRepository.find({
              select: {
                rooms: true,
                hashtags: true,
                reviews: true,
              },
              where: {
                name: Like(`%${keyword}%`),
                type,
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
                reviews: true,
              },
              order: {
                id: 'DESC',
              },
              skip: startIndex,
              take: perPage,
            });
          }
        } else {
          if (keyword === undefined || keyword === null) {
            paginatedSpaces = await this.spacesRepository.find({
              where: {
                type,
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
                reviews: true,
              },
              order: {
                id: 'ASC',
              },
              skip: startIndex,
              take: perPage,
            });
            // not keyword?
          } else {
            paginatedSpaces = await this.spacesRepository.find({
              select: {
                rooms: true,
                hashtags: true,
                reviews: true,
              },
              where: {
                name: Like(`%${keyword}%`),
                type,
              },
              relations: {
                rooms: true,
                user: true,
                hashtags: true,
                reviews: true,
              },
              order: {
                id: 'ASC',
              },
              skip: startIndex,
              take: perPage,
            });
          }
        }
      }
      const resPaginatedSpaces = [];
      paginatedSpaces.forEach((space) => {
        let minVal = 999999;
        space.rooms.forEach((room) => {
          if (room.price && room.price < minVal) {
            minVal = room.price;
          }
        });
        resPaginatedSpaces.push({
          id: space.id,
          name: space.name,
          type: space.type,
          reviewsLength: space.reviews.length,
          minPrice: minVal,
          rooms: space.rooms,
        });
      });

      return {
        totalPage,
        resPaginatedSpaces,
      };
    } catch (error) {
      throw error;
    }
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
          rooms: true,
          qnas: true,
          hashtags: true,
          reviews: true,
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

  // HostId로 공간 목록 조회(paginated)
  async findByUserPaginated(
    hostId: number,
    startIndex: number,
    perPage: number,
  ) {
    try {
      const totalSpaces: Array<Space> = await this.spacesRepository.find({
        select: {
          rooms: true,
          hashtags: true,
          reviews: true,
        },
        where: {
          user: {
            id: hostId,
          },
        },
        relations: {
          rooms: true,
          user: true,
          hashtags: true,
          reviews: true,
        },
        skip: startIndex,
        take: perPage,
      });
      const totalPage: number =
        parseInt((totalSpaces.length / perPage).toString()) + 1;

      const resPaginatedSpaces = [];
      totalSpaces.forEach((space) => {
        let minVal = 999999;
        space.rooms.forEach((room) => {
          if (room.price && room.price < minVal) {
            minVal = room.price;
          }
        });
        resPaginatedSpaces.push({
          id: space.id,
          name: space.name,
          type: space.type,
          reviewsLength: space.reviews.length,
          minPrice: minVal,
          rooms: space.rooms,
        });
      });
      return {
        totalPage,
        resPaginatedSpaces,
      };
    } catch (error) {
      throw error;
    }
  }

  // HostId로 공간 목록 조회
  async findByUser(hostId: number): Promise<Space[]> {
    try {
      return this.spacesRepository.find({
        select: {
          rooms: true,
          hashtags: true,
          reviews: true,
        },
        where: {
          user: {
            id: hostId,
          },
        },
        relations: {
          rooms: true,
          user: true,
          hashtags: true,
          reviews: true,
        },
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
