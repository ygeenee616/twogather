import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';
import { UpdateHashtagDto } from './dto/update-hashtag.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Hashtag } from './entities/hashtag.entity';

@Controller('api/hashtags')
@ApiTags('해시태그 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class HashtagsController {
  constructor(private readonly hashtagsService: HashtagsService) {}

  @Post(':spaceId')
  @ApiOperation({
    summary: '해시태그 생성 API',
    description: '해시태그를 생성한다.',
  })
  @ApiResponse({ status: 201, description: '생성된 해시태그', type: Hashtag })
  create(
    @Body() createHashtagDto: CreateHashtagDto,
    @Param('spaceId') spaceId: number,
  ) {
    return this.hashtagsService.create(createHashtagDto, spaceId);
  }

  @Get()
  findAll() {
    console.log('123');
    return this.hashtagsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 해시태그 찾는 API',
    description: '해시태그의 ID로 특정 해시태그를 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 해시태그', type: Hashtag })
  findOne(@Param('id') id: string) {
    return this.hashtagsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 해시태그 수정 API',
    description: '해시태그의 ID로 특정 해시태그를 수정한다.',
  })
  @ApiResponse({ status: 200, description: '수정된 해시태그', type: Hashtag })
  update(@Param('id') id: string, @Body() updateHashtagDto: UpdateHashtagDto) {
    return this.hashtagsService.update(+id, updateHashtagDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 해시태그 삭제 API',
    description: '해시태그의 ID로 특정 해시태그를 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 해시태그', type: Hashtag })
  remove(@Param('id') id: string) {
    return this.hashtagsService.remove(+id);
  }
}
