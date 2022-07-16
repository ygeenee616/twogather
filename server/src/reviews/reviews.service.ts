import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationsService } from 'src/reservations/reservations.service';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewsRepository: Repository<Review>,
    private reservationService: ReservationsService,
  ) {}

  async create(createReviewDto: CreateReviewDto, reservationId: number) {
    try {
      const reservation = await this.reservationService.findOne(reservationId);
      const newReview = {
        ...createReviewDto,
        reservation,
      };
      // return await this.reviewsRepository.save(newReview); 예약구현되면 주석 풀기
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.reviewsRepository.find({
      order: {
        id: 'DESC',
      },
      // cache: true,
    });
  }

  // reviewId로 특정 review 조회
  async findOne(id: number) {
    try {
      const review = await this.reviewsRepository.findOne({
        where: {
          id,
        },
      });
      if (review === null) {
        throw new NotFoundException('존재하지 않는 reivew입니다.');
      }
      return review;
    } catch (error) {
      throw error;
    }
  }

  //reviewId로 review 수정
  async update(id: number, updateReviewDto: UpdateReviewDto) {
    try {
      const updatedReview = await this.reviewsRepository.update(
        id,
        updateReviewDto,
      );
      return updatedReview.affected === 1;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const deletedReview = await this.reviewsRepository.delete(id);
      if (!deletedReview.affected) {
        throw new NotFoundException({
          description: '삭제할 review가 없습니다.',
        });
      }
    } catch (error) {
      throw error;
    }
  }
}
