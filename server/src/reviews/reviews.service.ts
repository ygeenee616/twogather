import {
  BadRequestException,
  ConflictException,
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

  async create(
    createReviewDto: CreateReviewDto,
    reservationId: number,
    spaceId: number,
  ) {
    try {
      const reservation = await this.reservationService.findOne(reservationId);
      const space = reservation.room.space;
      const newReview = {
        ...createReviewDto,
        reservation,
        space,
        createdTime: new Date(),
      };
      return await this.reviewsRepository.save(newReview);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 리뷰가 작성되었습니다.');
      }
      throw error;
    }
  }

  async findAll() {
    return await this.reviewsRepository.find({
      relations: {
        reservation: true,
        space: true,
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
        select: {
          reservation: {
            id: true,
            user: {
              id: true,
              nickname: true,
              email: true,
            },
          },
          space: {
            id: true,
          },
        },
        where: {
          id,
        },
        relations: {
          reservation: {
            user: true,
          },
          space: true,
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

  async findBySpace(spaceId: number): Promise<Review[]> {
    try {
      return await this.reviewsRepository.find({});
    } catch (error) {
      throw error;
    }
  }

  //reviewId로 review 수정
  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<boolean> {
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
      if (userId !== review[0].userId) {
        throw new UnauthorizedException('권한 없음');
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
      const review = await this.reviewsRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
