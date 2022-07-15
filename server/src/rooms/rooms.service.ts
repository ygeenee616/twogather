import { Injectable } from '@nestjs/common';
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
    return `This action returns all rooms`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
