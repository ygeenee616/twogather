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

  async create(createReservationDto: CreateReservationDto, user: User) {
    try {
      const newReservation = {
        user,
        ...createReservationDto,
      };
      return await this.reservationRepository.save(newReservation);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all reservations`;
  }

  async findOne(id: number) {
    try {
      const review = await this.reservationRepository.findOne({
        where: {
          id,
        },
      });
      if (review === null) {
        throw new NotFoundException('존재하지 않는 예약입니다.');
      }
      return review;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateReservationDto: UpdateReservationDto) {
    return `This action updates a #${id} reservation`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservation`;
  }
}
