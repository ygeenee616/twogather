import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { AuthGuard } from '@nestjs/passport';
import { ReviewResExample } from './review.swagger.example';
import { GetAdminUser, GetUser } from 'src/custom.decorator';
import { User } from 'src/users/entities/users.entity';
import { ReservationsService } from 'src/reservations/reservations.service';
import { Reservation } from 'src/reservations/entities/reservation.entity';
import { identity } from 'rxjs';
import { number, object } from 'joi';
import { SpacesService } from 'src/spaces/spaces.service';
const reviewResExample = new ReviewResExample();

@Controller('api/reviews')
@ApiTags('리뷰 API')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly reservationsService: ReservationsService,
    private readonly spacesService: SpacesService,
  ) {}

  // review 등록(api data 수정 완료)
  @Post('/:reservationId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
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
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('reservationId') reservationId: number,
    @GetUser() user: User,
  ): Promise<any> {
    //Get reservation Information for using user Id. It throw Forbidden Exception when you try to creat a review for other's reservation.
    const reqReservation = await this.reservationsService.findOne(
      reservationId,
    );
    const spaceId = reqReservation.room.space.id;
    if (reqReservation.user.id !== user.id) {
      throw new ForbiddenException('자신의 리뷰만 쓸 수 있습니다. ');
    }
    const result = await Promise.all([
      this.reviewsService.create(createReviewDto, reservationId, spaceId),
      this.spacesService.updateCountUp(spaceId),
    ]);
    const { id, content, reservation, space } = result[0];

    const resReview = {
      id,
      content,
      reservationId: reservation.id,
      spaceId: space.id,
    };

    return {
      status: 201,
      description: '새로운 리뷰 등록 완료',
      success: true,
      data: resReview,
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
    const rawReviews = await this.reviewsService.findAll();

    return {
      status: 200,
      description: '전체 리뷰 목록 조회 성공',
      success: true,
      data: rawReviews,
    };
  }
  // 내가 쓴 리뷰 목록 조회
  @Get('/my/info')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
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
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
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

  @Get('space/:spaceId')
  @ApiOperation({
    summary: 'space ID로 리뷰 조회 API',
    description: 'space ID로 특정 리뷰를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 리뷰',
    schema: {
      example: reviewResExample.findOne,
    },
  })
  async findBySpace(@Param('spaceId') spaceId: number) {
    const reviews = await this.reviewsService.findBySpace(spaceId);
    if (!reviews || reviews === undefined || reviews === null) {
      throw new NotFoundException('리뷰가 없습니다.');
    }
    return {
      status: 200,
      description: 'space ID로 리뷰 목록을 조회한다.',
      success: true,
      data: reviews,
    };
  }

  // reviewId로 특정 리뷰 수정(admin)
  @Patch(':id')
  @ApiOperation({
    summary: '특정 리뷰 수정 API',
    description: '리뷰 ID로 특정 리뷰를 수정한다.(admin)',
  })
  @ApiResponse({
    status: 201,
    description: 'reviewId로 특정 review 수정 성공',
    schema: {
      example: reviewResExample.updateReview,
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token',
  })
  async updateReview(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @GetAdminUser() host: User,
  ) {
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
  @ApiBearerAuth('userToken')
  @ApiBearerAuth('userToken')
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
    const review = await this.reviewsService.findOne(id);
    const reservation = review.reservation;
    if (reservation.user.id !== user.id) {
      throw new ForbiddenException('자신의 리뷰만 수정할 수 있습니다. ');
    }

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
  @UseGuards(AuthGuard())
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
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  })
  async removeReview(@Param('id') id: number, @GetAdminUser() host: User) {
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
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '내가 쓴 특정 리뷰 삭제 API',
    description: '내가 쓴 특정 리뷰를 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '내가 쓴 특정 삭제된 리뷰 삭제 성공',
    schema: {
      example: reviewResExample.removeMyReview,
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  })
  async removeMyReview(@GetUser() user: User, @Param('id') id: number) {
    const review = await this.reviewsService.findOne(id);
    const reservation = review.reservation;
    if (reservation.user.id !== user.id) {
      throw new ForbiddenException('자신의 리뷰만 삭제할 수 있습니다. ');
    }
    await this.reviewsService.removeMyReview(user.id, id);
    await this.spacesService.updateCountDown(review.space.id);
    return {
      status: 201,
      description: '내가 쓴 특정 review 삭제 성공',
      success: true,
    };
  }
}
