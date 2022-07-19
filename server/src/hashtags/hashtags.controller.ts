import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiHeader,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Hashtag } from './entities/hashtag.entity';
import { UpdateDateColumn } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/hashtags')
@ApiTags('해시태그 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Post(':spaceId')
  @UseGuards(AuthGuard())
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '해시태그 생성 API',
    description: '해시태그를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '해시태그 생성 성공',
    type: Hashtag,
  })
  async create(
    @Body() createHashtagDto: CreateHashtagDto,
    @Param('spaceId') spaceId: number,
  ) {
    const hashtags = await this.hashtagsService.create(
      createHashtagDto,
      spaceId,
    );
    return {
      status: 200,
      description: '해시태그 생성 성공',
      success: true,
      data: hashtags,
    };
  }

  @Get()
  @ApiOperation({
    summary: '전체 해시태그 목록 조회 API',
    description: '전체 해시태그 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 해시태그 목록 조회',
    type: Hashtag,
  })
  findAll() {
    return this.hashtagsService.findAll();
  }

  @Get('space/:spaceId')
  @ApiOperation({
    summary: '특정 공간의 해시태그 목록 조회 API',
    description: '특정 공간의 해시태그 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 공간의 해시태그 목록 조회',
    type: Hashtag,
  })
  async findAllBySpace(@Param('spaceId') spaceId: number) {
    const hashtags = await this.hashtagsService.findAllBySpace(spaceId);
    return {
      status: 200,
      description: '특정 공간의 해시태그 목록 조회 성공',
      success: true,
      data: hashtags,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 해시태그 찾는 API',
    description: '해시태그의 ID로 특정 해시태그를 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 해시태그', type: Hashtag })
  async findOne(@Param('id') id: number) {
    const hashtag = await this.hashtagsService.findOne(id);
    return {
      status: 200,
      description: '특정 해시태그',
      success: true,
      data: hashtag,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 해시태그 수정 API',
    description: '해시태그의 ID로 특정 해시태그를 수정한다.',
  })
  @ApiResponse({
    status: 200,
    description: '해시태그 수정 성공',
    type: Hashtag,
  })
  async update(
    @Param('id') id: number,
    @Body() updateHashtagDto: UpdateHashtagDto,
  ) {
    const updateHashtag = await this.hashtagsService.update(
      id,
      updateHashtagDto,
    );
    return {
      status: 200,
      description: '해시태그 수정 성공',
      success: true,
      affected: updateHashtag.affected === 1,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 해시태그 삭제 API',
    description: '해시태그의 ID로 특정 해시태그를 삭제한다.',
  })
  @ApiResponse({
    status: 200,
    description: '해시태그 삭제 성공',
    type: Hashtag,
  })
  async remove(@Param('id') id: number) {
    const deletedHashtag = await this.hashtagsService.remove(id);
    return {
      status: 200,
      description: '해시태그 삭제 성공',
      success: true,
      affected: deletedHashtag.affected === 1,
    };
  }
}
