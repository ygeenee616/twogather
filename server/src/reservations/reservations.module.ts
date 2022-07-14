import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SpacesModule } from 'src/spaces/spaces.module';
import { SpacesService } from 'src/spaces/spaces.service';
import { Space } from 'src/spaces/entities/spaces.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Space]),
    UsersModule,
    SpacesModule,
  ],
  exports: [TypeOrmModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, SpacesService],
})
export class ReservationsModule {}
