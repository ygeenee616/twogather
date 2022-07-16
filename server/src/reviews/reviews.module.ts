import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from 'src/reservations/reservations.module';
import { ReservationsService } from 'src/reservations/reservations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), ReservationsModule],
  exports: [TypeOrmModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, ReservationsService],
})
export class ReviewsModule {
  constructor(private reviewsService: ReviewsService) {}
}
