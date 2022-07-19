import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { AuthGuard } from '@nestjs/passport';
import { ReviewResExample } from './review.swagger.example';
import { GetUser } from 'src/custom.decorator';
import { User } from 'src/users/entities/users.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
const reviewResExample = new ReviewResExample();

@Controller('api/reviews')
@ApiTags('리뷰 API')
// @ApiHeader({
//   name: 'authorization',
//   description: 'Auth token',
// }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private reservationsService: ReservationsService,
  ) {}

  // review 등록
  @Post('/:reservationId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '리뷰 등록 API',
    description: '리뷰를 등록한다.',
  })
  @ApiResponse({
    status: 201,
    description: '등록된 리뷰',
    schema: {
      example: reviewResExample.create,
    },
  })
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('reservationId') reservationId: number,
    @GetUser() user: User,
  ) {
    const reservation = await this.reservationsService.findOne(reservationId);
    if (reservation.user !== user) {
      throw new UnauthorizedException('권한없음');
    }
    const newReview = await this.reviewsService.create(
      createReviewDto,
      reservationId,
    );
    return {
      status: 201,
      description: '새로운 리뷰 등록 완료',
      success: true,
      data: newReview,
    };
  }

  // 전체 Review 목록 조회
  @Get()
  @ApiOperation({
    summary: '리뷰 findAll API',
    description: '전체 리뷰 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 리뷰 목록',
    schema: {
      example: reviewResExample.findAll,
    },
  })
  async findAll() {
    const reviews = await this.reviewsService.findAll();
    return {
      status: 200,
      description: '전체 리뷰 목록 조회 성공',
      success: true,
      data: reviews,
    };
  }

  /* Todo
    1. space 별로 review 수 count
    2. space별로 reivew 가져오기(페이지네이션 추가된)
     
  */

  // 내가 쓴 리뷰 목록 조회
  @Get('/mypage')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내가 쓴 리뷰 findAll API',
    description: '내가 쓴 리뷰 목록을 불러온다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 200,
    description: '내가 쓴 리뷰 목록 조회 성공',
    schema: {
      example: reviewResExample.findMyReviews,
    },
  })
  async findMyReviews(@GetUser() user: User) {
    const reviews = await this.reviewsService.findMyReviews(user.id);
    return {
      status: 200,
      description: '내가 쓴 리뷰 목록 조회 성공',
      success: true,
      data: reviews,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 리뷰 찾는 API',
    description: '리뷰 ID로 특정 리뷰를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 리뷰',
    schema: {
      example: reviewResExample.findOne,
    },
  })
  async findOne(@Param('id') id: number) {
    const review = await this.reviewsService.findOne(+id);
    return {
      status: 200,
      success: true,
      description: 'reviewId로 review 조회 성공',
      data: review,
    };
  }

  // reviewId로 특정 리뷰 수정
  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '특정 리뷰 수정 API',
    description: '리뷰 ID로 특정 리뷰를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'reviewId로 특정 review 수정 성공',
    schema: {
      example: reviewResExample.updateReview,
    },
  })
  async updateReview(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetUser() user: User,
  ) {
    const review = await this.reviewsService.findOne(id);
    if (review.reservation.user !== user) {
      throw new UnauthorizedException('권한없음');
    }
    const updatedReview = await this.reviewsService.update(
      +id,
      updateReviewDto,
    );
    return {
      status: 201,
      description: 'reviewId로 특정 reivew 수정',
      success: true,
      data: { affected: updatedReview },
    };
  }

  // 내가 쓴 특정 리뷰 수정
  @Patch('mypage/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내가 쓴 특정 리뷰 수정 API',
    description: '내가 쓴 특정 리뷰를 수정한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 201,
    description: '내가 쓴 특정 review 수정 성공',
    schema: {
      example: reviewResExample.updateMyReview,
    },
  })
  async updateMyReview(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    const updatedReview = await this.reviewsService.updateMyReview(
      user.id,
      id,
      updateReviewDto,
    );
    return {
      status: 201,
      description: '내가 쓴 특정 reivew 수정 성공',
      success: true,
      data: { affected: updatedReview },
    };
  }

  // reviewId로 특정 review 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '특정 리뷰 삭제 API',
    description: '리뷰 ID로 특정 리뷰를 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '삭제된 리뷰',
    schema: {
      example: reviewResExample.removeReview,
    },
  })
  async removeReview(@Param('id') id: number) {
    await this.reviewsService.remove(+id);
    return {
      status: 201,
      description: 'reviewId로 특정 review 삭제 성공',
      success: true,
    };
  }

  // 내가 쓴 특정 review 삭제
  @Delete('mypage/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내가 쓴 특정 리뷰 삭제 API',
    description: '내가 쓴 특정 리뷰를 삭제한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 201,
    description: '내가 쓴 특정 삭제된 리뷰 삭제 성공',
    schema: {
      example: reviewResExample.removeMyReview,
    },
  })
  async removeMyReview(@GetUser() user: User, @Param('id') id: number) {
    await this.reviewsService.removeMyReview(user.id, id);
    return {
      status: 201,
      description: '내가 쓴 특정 review 삭제 성공',
      success: true,
    };
  }
}
