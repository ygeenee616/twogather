import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomsService } from 'src/rooms/rooms.service';
import { SpacesService } from 'src/spaces/spaces.service';
import { User } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private roomsService: RoomsService,
    private spaceService: SpacesService,
  ) {}

  async create(createReservationDto: CreateReservationDto, user: User, room) {
    try {
      const newReservation = {
        ...createReservationDto,
        user,
        room,
      };
      return await this.reservationRepository.save(newReservation);
    } catch (error) {
      throw error;
    }
  }

  // 전체 예약 목록 조회
  async findAll(startIndex: number, perPage: number) {
    try {
      const totalSpace = await this.reservationRepository.find();
      const totalPage = parseInt((totalSpace.length / perPage).toString()) + 1;
      const paginatedSpaces = await this.reservationRepository.find({
        relations: {
          user: true,
        },
        order: {
          id: 'DESC',
        },
        skip: startIndex,
        take: perPage,
      });
      return {
        totalPage,
        paginatedSpaces,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const reservation = await this.reservationRepository.findOne({
        where: {
          id,
        },
        relations: {
          user: true,
        },
      });
      if (reservation === null) {
        throw new NotFoundException('존재하지 않는 예약입니다.');
      }
      return reservation;
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    try {
      const updateReservation = await this.reservationRepository.update(
        id,
        updateReservationDto,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      return await this.reservationRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
