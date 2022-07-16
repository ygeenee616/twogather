import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SpacesModule } from 'src/spaces/spaces.module';
import { SpacesService } from 'src/spaces/spaces.service';
import { Space } from 'src/spaces/entities/spaces.entity';
import { PassportModule } from '@nestjs/passport';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomsService } from 'src/rooms/rooms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Space]),
    UsersModule,
    SpacesModule,
    RoomsModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [TypeOrmModule, PassportModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, SpacesService, RoomsService],
})
export class ReservationsModule {}
