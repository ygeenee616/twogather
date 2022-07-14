import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/custom.decorator';
import { User } from 'src/users/entities/users.entity';
import { SpacesService } from 'src/spaces/spaces.service';

@Controller('api/reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @UseGuards(AuthGuard())
  async reserve(
    @GetUser() user: User,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    const { spaceId } = createReservationDto;
    const newReservation = await this.reservationsService.create(
      createReservationDto,
      user,
    );
    return {
      status: 200,
      success: true,
      description: '예약 성공',
      data: newReservation,
    };
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservationsService.remove(+id);
  }
}
