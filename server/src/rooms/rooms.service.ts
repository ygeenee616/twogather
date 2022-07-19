import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpacesService } from 'src/spaces/spaces.service';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/rooms.entity';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private roomsRepository: Repository<Room>,
    private spaceService: SpacesService,
  ) {}

  async create(createRoomDto: CreateRoomDto, spaceId: number) {
    try {
      const space = await this.spaceService.findOne(spaceId);
      const newRoom = {
        ...createRoomDto,
        space,
      };
      return await this.roomsRepository.save(newRoom);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.roomsRepository.find({
      relations: {
        space: true,
      },
      order: {
        id: 'DESC',
      },
      // cache:true, 캐시는 할 지 말지.
    });
  }

  async findAllBySpace(spaceId: number) {
    try {
      return await this.roomsRepository.find({
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

  // roomId로 특정 room 조회
  async findOne(id: number) {
    try {
      const room = await this.roomsRepository.findOne({
        where: {
          id,
        },
        relations: {
          reservations: true,
          space: {
            user: true,
          },
        },
        // cache: true,
      });
      if (room === null) {
        throw new NotFoundException('존재하지 않는 room입니다.');
      }
      return room;
    } catch (error) {
      throw error;
    }
  }

  // HostId로 rooms 조회
  async findRoomsByUser(hostId: number) {
    try {
      const rooms = await this.roomsRepository.find({
        where: {
          space: {
            user: {
              id: hostId,
            },
          },
        },
        relations: {
          space: true,
        },
      });
      return rooms;
    } catch (error) {
      throw error;
    }
  }

  // roomId로 room 수정
  async update(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      const updatedRoom = await this.roomsRepository.update(id, updateRoomDto);
      return updatedRoom.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  // 내 room 수정
  async updateMyRoom(id: number, updateRoomDto: UpdateRoomDto) {
    try {
      const updatedRoom = await this.roomsRepository.update(id, updateRoomDto);
      return updatedRoom.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  // room 삭제
  async remove(id: number) {
    try {
      const deletedRoom = await this.roomsRepository.delete(id);
      if (!deletedRoom.affected) {
        throw new NotFoundException({
          description: '삭제할 room이 없습니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
