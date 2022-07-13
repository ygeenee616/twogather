import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Reservation } from './entities/reservation.entity';

@UseFilters(HttpExceptionFilter)
@Controller('reservations')
@ApiTags('예약 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({
    summary: '예약 생성 API',
    description: '예약을 생성한다.',
  })
  @ApiResponse({ status: 201, description: '생성된 예약', type: Reservation })
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({
    summary: '예약 findAll API',
    description: '전체 예약 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 예약 목록',
    type: Reservation,
  })
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 예약 찾는 API',
    description: '예약의 ID로 특정 예약을 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 예약', type: Reservation })
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 예약 수정 API',
    description: '예약 ID로 특정 예약을 수정한다.',
  })
  @ApiResponse({ status: 200, description: '수정된 예약', type: Reservation })
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 예약 삭제 API',
    description: '예약 ID로 특정 예약 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 예약', type: Reservation })
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
