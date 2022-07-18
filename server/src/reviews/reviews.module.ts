import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { ReservationsService } from 'src/reservations/reservations.service';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomsService } from 'src/rooms/rooms.service';
import { SpacesService } from 'src/spaces/spaces.service';
import { SpacesModule } from 'src/spaces/spaces.module';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    ReservationsModule,
    RoomsModule,
    SpacesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [TypeOrmModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReservationsService, RoomsService, SpacesService],
})
export class ReviewsModule {
  constructor(private reviewsService: ReviewsService) {}
}
