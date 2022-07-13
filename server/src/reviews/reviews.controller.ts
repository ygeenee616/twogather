import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Review } from './entities/review.entity';

@UseFilters(HttpExceptionFilter)
@Controller('reviews')
@ApiTags('리뷰 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({
    summary: '리뷰 생성 API',
    description: '리뷰를 생성한다.',
  })
  @ApiResponse({ status: 201, description: '생성된 리뷰', type: Review })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({
    summary: '리뷰 findAll API',
    description: '전체 리뷰 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 리뷰 목록',
    type: Review,
  })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 리뷰 찾는 API',
    description: '리뷰 ID로 특정 리뷰를 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 리뷰', type: Review })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 리뷰 수정 API',
    description: '리뷰 ID로 특정 리뷰를 수정한다.',
  })
  @ApiResponse({ status: 200, description: '수정된 리뷰', type: Review })
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 리뷰 삭제 API',
    description: '리뷰 ID로 특정 리뷰를 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 리뷰', type: Review })
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
