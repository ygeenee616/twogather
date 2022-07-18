import {
  Get,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
        createdTime: new Date(),
      };
      return await this.reviewsRepository.save(newReview);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.reviewsRepository.find({
      relations: {
        reservation: true,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  // 내가 쓴 리뷰 목록 조회
  async findMyReviews(userId: number) {
    try {
      const reviews = await this.reviewsRepository.query(
        `SELECT A.id as reviewId, A.createdTime as reviewCreatedTime, A.content, A.reservationId, B.id as reservationId, B.date, 
        B.personnel, B.createdTime as reservationCreatedTime, B.userId, B.startTime, B.endTime, B.roomId,
        C.id as userId, C.nickname, C.email, C.name, C.phoneNumber
        from review A, reservation B, user C WHERE A.reservationId = B.id and B.userId = C.id and C.id = ${userId};`,
      );
      return reviews;
    } catch (error) {
      throw error;
    }
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

  // 내가 쓴 review 수정
  async updateMyReview(
    userId: number,
    id: number,
    updateReviewDto: UpdateReviewDto,
  ) {
    try {
      const review = await this.reviewsRepository.query(
        `SELECT A.id as reviewId, A.createdTime as reviewCreatedTime, A.content, A.reservationId, B.id as reservationId, B.date, 
        B.personnel, B.createdTime as reservationCreatedTime, B.userId, B.startTime, B.endTime, B.roomId,
        C.id as userId, C.nickname, C.email, C.name, C.phoneNumber
        from review A, reservation B, user C WHERE A.reservationId = B.id and B.userId = C.id and A.id = ${id};`,
      );
      console.log(review[0].userId);
      if (userId !== review[0].userId) {
        throw UnauthorizedException;
      }
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

  async removeMyReview(userId: number, id: number) {
    try {
      const review = await this.reviewsRepository.query(
        `SELECT A.id as reviewId, A.createdTime as reviewCreatedTime, A.content, A.reservationId, B.id as reservationId, B.date, 
        B.personnel, B.createdTime as reservationCreatedTime, B.userId, B.startTime, B.endTime, B.roomId,
        C.id as userId, C.nickname, C.email, C.name, C.phoneNumber
        from review A, reservation B, user C WHERE A.reservationId = B.id and B.userId = C.id and A.id = ${id};`,
      );
      console.log(review[0].userId);
      if (userId !== review[0].userId) {
        throw UnauthorizedException;
      }
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
