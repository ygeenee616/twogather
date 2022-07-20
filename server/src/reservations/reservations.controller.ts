import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UnauthorizedException,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiHeader,
} from '@nestjs/swagger';
import { Reservation } from './entities/reservation.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/users.entity';
import { GetUser } from 'src/custom.decorator';
import { RoomsService } from 'src/rooms/rooms.service';

@Controller('api/reservations')
@ApiTags('예약 API')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    private roomsService: RoomsService,
  ) {}

  // 예약 등록
  @Post(':roomId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '예약 등록 API',
    description: '예약을 등록한다.',
  })
  @ApiResponse({
    status: 201,
    description: '예약 성공',
    type: Reservation,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  async reserve(
    @GetUser() user: User,
    @Body() createReservationDto: CreateReservationDto,
    @Param('roomId') roomId: number,
  ) {
    const roomInfo = await this.roomsService.findOne(roomId);
    const newReservation = await this.reservationsService.create(
      createReservationDto,
      user,
      roomInfo,
    );
    return {
      status: 201,
      success: true,
      description: '예약 성공',
      data: newReservation,
    };
  }

  // 예약 전체 조회
  @Get()
  @ApiOperation({
    summary: '예약 findAll API',
    description: '전체 예약 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description:
      '전체 예약 목록 조회(예약 목록 전체보기 페이지), 페이지네이션 가능(localhost:3000/api/reservations?page=1&perPage=5)',
    type: Reservation,
  })
  async findAll(@Query() query) {
    const { page, perPage } = query;
    const startIndex: number = perPage * (page - 1);
    const spaces = await this.reservationsService.findAll(startIndex, perPage);
    return {
      status: 200,
      description: '전체 예약 목록 조회 성공',
      success: true,
      data: {
        spaces,
      },
    };
  }

  // roomId로 특정 룸의 예약 전제 조회
  @Get('room/:roomId')
  @ApiOperation({
    summary: '특정 룸의 예약 findAll API',
    description: '특정 룸의 전체 예약 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description:
      '특정 룸의 예약 목록 조회, 페이지네이션 가능(localhost:3000/api/reservations/room/50?page=1&perPage=5)',
    type: Reservation,
  })
  async findAllByRoom(@Param('roomId') roomId: number, @Query() query) {
    const { page, perPage, date } = query;
    if (page === null || page === undefined || !page) {
      const reservations = await this.reservationsService.findAllByRoom(
        roomId,
        date,
      );
      return {
        status: 200,
        description: '특정 룸의 예약 목록 조회 성공',
        success: true,
        data: reservations,
      };
    }
    const startIndex: number = Number(perPage) * (Number(page) - 1);
    const { totalPage, paginatedReservations } =
      await this.reservationsService.findAllByRoomPaginated(
        roomId,
        startIndex,
        Number(perPage),
        date,
      );
    return {
      status: 200,
      description: '특정 룸의 예약 목록 조회 성공',
      success: true,
      data: {
        totalPage,
        paginatedReservations,
      },
    };
  }

  // id로 예약 조회
  @Get(':id')
  @ApiOperation({
    summary: '특정 예약 찾는 API',
    description: '예약의 ID로 특정 예약을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 예약 조회 성공',
    type: Reservation,
  })
  async findOne(@Param('id') id: number) {
    const reservation = await this.reservationsService.findOne(id);
    return {
      status: 200,
      description: '특정 예약 조회 성공',
      success: true,
      data: reservation,
    };
  }

  // 내 예약 목록 조회
  @Get('/my/info')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '내 예약 찾는 API',
    description: '내 예약을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '내 예약 조회 성공',
    type: Reservation,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  async findMyReservation(@GetUser() user: User, @Query() query) {
    const { page, perPage } = query;
    const startIndex: number = Number(perPage) * (Number(page) - 1);
    const reservations = await this.reservationsService.findMyReservation(
      user,
      startIndex,
      perPage,
    );
    return {
      status: 200,
      description: '내 예약 조회 성공',
      success: true,
      data: reservations,
    };
  }

  // 내 예약 수정
  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '내 예약 수정 API',
    description: '예약 ID로 나의 예약을 수정한다.',
  })
  @ApiResponse({
    status: 200,
    description: '내 예약 정보 수정 성공',
    type: Reservation,
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async update(
    @Param('id') id: number,
    @Body() updateReservationDto: UpdateReservationDto,
    @GetUser() user: User,
  ) {
    const reservation = await this.reservationsService.findOne(id);
    if (reservation.user.id !== user.id) {
      throw new UnauthorizedException('권한 없음');
    }
    const updateReservation = await this.reservationsService.update(
      id,
      updateReservationDto,
    );
    return {
      status: 200,
      description: '내 예약 정보 수정 성공',
      success: true,
      data: updateReservation,
    };
  }

  // 내 예약 삭제
  @Delete('my/:id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '내 예약 삭제 API',
    description: '예약 ID로 내 예약을 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 예약', type: Reservation })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async deleteReservation(@Param('id') id: number, @GetUser() user: User) {
    const reservation = await this.reservationsService.findOne(id);
    if (reservation.user.id !== user.id) {
      throw new UnauthorizedException('권한 없음');
    }
    const removeReservation = await this.reservationsService.remove(id);
    return {
      status: 200,
      description: '예약 삭제 성공',
      success: true,
      data: removeReservation.affected === 1,
    };
  }

  // 예약 삭제(admin)
  @Delete(':id')
  @ApiOperation({
    summary: '특정 예약 삭제 API',
    description: '예약 ID로 특정 예약 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 예약', type: Reservation })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async deleteMyReservation(@Param('id') id: number) {
    const removeReservation = await this.reservationsService.remove(id);
    return {
      status: 200,
      description: '예약 삭제 성공',
      success: true,
      data: removeReservation.affected === 1,
    };
  }
}
