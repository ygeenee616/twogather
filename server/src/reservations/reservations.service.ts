import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { identity } from 'rxjs';
import { Room } from 'src/rooms/entities/rooms.entity';
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
  ) {}

  // 예약 등록
  async create(
    createReservationDto: CreateReservationDto,
    user: User,
    room: Room,
  ) {
    try {
      const newReservation = await this.reservationRepository.create({
        ...createReservationDto,
        user,
        room,
      });

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
      const paginatedReservations = await this.reservationRepository.find({
        select: {
          user: {
            id: true,
            email: true,
            phoneNumber: true,
            nickname: true,
          },
          room: {
            id: true,
            name: true,
            capacity: true,
            price: true,
            space: {
              id: true,
              name: true,
              user: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        relations: {
          user: true,
          room: {
            space: {
              user: true,
            },
          },
        },
        order: {
          id: 'DESC',
        },
        skip: startIndex,
        take: perPage,
      });
      return {
        totalPage,
        paginatedReservations,
      };
    } catch (error) {
      throw error;
    }
  }

  // 내 예약 조회
  async findMyReservation(user: User, startIndex: number, perPage: number) {
    try {
      const totalReservation = await this.reservationRepository.find();
      const totalPage =
        parseInt((totalReservation.length / perPage).toString()) + 1;
      const paginatedReservations = await this.reservationRepository.find({
        select: {
          user: {
            id: true,
            name: true,
            email: true,
          },
          room: {
            id: true,
            name: true,
            price: true,
            space: {
              id: true,
              name: true,
            },
          },
          review: {
            id: true,
            content: true,
            space: {
              id: true,
            },
          },
        },
        where: {
          user,
        },
        relations: {
          user: true,
          room: {
            space: true,
          },
          review: true,
        },
        order: {
          id: 'DESC',
        },
        skip: startIndex,
        take: perPage,
      });
      return {
        totalPage,
        paginatedReservations,
      };
    } catch (error) {
      throw error;
    }
  }

  // 룸으로 예약 목록 조회
  async findAllByRoom(roomId: number, date: string) {
    try {
      let reservations;
      if (!date || date === undefined || date === null) {
        reservations = await this.reservationRepository.find({
          select: {
            user: {
              id: true,
              name: true,
              email: true,
              nickname: true,
            },
          },
          where: {
            room: {
              id: roomId,
            },
          },
          relations: {
            user: true,
          },
          order: {
            id: 'DESC',
          },
        });
      } else {
        reservations = await this.reservationRepository.find({
          select: {
            user: {
              id: true,
              name: true,
              email: true,
              nickname: true,
            },
          },
          where: {
            date,
            room: {
              id: roomId,
            },
          },
          relations: {
            user: true,
          },
          order: {
            id: 'DESC',
          },
        });
      }

      return {
        reservations,
      };
    } catch (error) {
      throw error;
    }
  }

  // 룸으로 예약 목록 조회(paginated)
  async findAllByRoomPaginated(
    roomId: number,
    startIndex: number,
    perPage: number,
    date: string,
  ) {
    try {
      const totalReservation = await this.reservationRepository.find({
        where: {
          room: {
            id: roomId,
          },
        },
      });
      const totalPage = Math.ceil(totalReservation.length / perPage);
      let paginatedReservations;
      if (!date || date === undefined || date === null) {
        paginatedReservations = await this.reservationRepository.find({
          select: {
            user: {
              id: true,
              name: true,
              email: true,
              nickname: true,
            },
          },
          where: {
            room: {
              id: roomId,
            },
          },
          relations: {
            user: true,
          },
          order: {
            id: 'DESC',
          },
          skip: startIndex,
          take: perPage,
        });
      } else {
        paginatedReservations = await this.reservationRepository.find({
          select: {
            user: {
              id: true,
              name: true,
              email: true,
              nickname: true,
            },
          },
          where: {
            date,
            room: {
              id: roomId,
            },
          },
          relations: {
            user: true,
          },
          order: {
            id: 'DESC',
          },
          skip: startIndex,
          take: perPage,
        });
      }

      return {
        totalPage,
        paginatedReservations,
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const reservation = await this.reservationRepository.findOne({
        select: {
          user: {
            id: true,
            name: true,
            email: true,
            nickname: true,
          },
          room: {
            id: true,
            name: true,
            price: true,
            capacity: true,

            space: {
              id: true,
              name: true,
              user: {
                id: true,
                email: true,
                name: true,
                nickname: true,
              },
            },
          },
        },
        where: {
          id,
        },
        relations: {
          user: true,
          room: {
            space: {
              user: true,
            },
          },
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
