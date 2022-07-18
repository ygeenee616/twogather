import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from 'src/rooms/rooms.service';
import { Repository } from 'typeorm';
import { CreateRoomImageDto } from './dto/create-room_image.dto';
import { UpdateRoomImageDto } from './dto/update-room_image.dto';
import { RoomImage } from './entities/room_image.entity';

@Injectable()
export class RoomImagesService {
  constructor(
    @InjectRepository(RoomImage)
    private roomImagesRepository: Repository<RoomImage>,
    private roomService: RoomsService,
  ) {}

  async create(createRoomImageDto: CreateRoomImageDto, roomId: number) {
    try {
      const room = await this.roomService.findOne(roomId);
      const newRoomImage = {
        ...createRoomImageDto,
        room,
      };
      return await this.roomImagesRepository.save(newRoomImage);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.roomImagesRepository.find({
      relations: {
        room: true,
      },
      order: {
        id: 'DESC',
      },
      // cache: true,
    });
  }

  async findAllByRoom(roomId: number) {
    try {
      return await this.roomImagesRepository.find({
        where: {
          room: {
            id: roomId,
          },
        },
        relations: {
          room: true,
        },
        order: {
          id: 'DESC',
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // roomImageId로 특정 roomImage 조회
  async findOne(id: number) {
    try {
      const roomImage = await this.roomImagesRepository.findOne({
        where: {
          id,
        },
        relations: {
          room: true,
        },
        // cache: true,
      });
      if (roomImage === null) {
        throw new NotFoundException('존재하지 않는 roomImage입니다.');
      }
      return roomImage;
    } catch (error) {
      throw error;
    }
  }

  // roomImageId로 roomImage(URL) 수정
  async update(id: number, updateRoomImageDto: UpdateRoomImageDto) {
    try {
      const updatedRoomImage = await this.roomImagesRepository.update(
        id,
        updateRoomImageDto,
      );
      return updatedRoomImage.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  // roomImageId로 roomImage(URL) 삭제
  async remove(id: number) {
    try {
      const deletedRoomImage = await this.roomImagesRepository.delete(id);
      if (!deletedRoomImage.affected) {
        throw new NotFoundException({
          description: '삭제할 roomImage가 없습니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
