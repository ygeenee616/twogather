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
import { SpaceImagesService } from './space_images.service';
import { CreateSpaceImageDto } from './dto/create-space_image.dto';
import { UpdateSpaceImageDto } from './dto/update-space_image.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { SpaceImage } from './entities/space_image.entity';

@UseFilters(HttpExceptionFilter)
@Controller('space-images')
@ApiTags('공간 이미지 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class SpaceImagesController {
  constructor(private readonly spaceImagesService: SpaceImagesService) {}

  @Post()
  @ApiOperation({
    summary: 'space 이미지(URL) 생성 API',
    description: 'space 이미지(URL)를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 space 이미지(URL)',
    type: SpaceImage,
  })
  create(@Body() createSpaceImageDto: CreateSpaceImageDto) {
    return this.spaceImagesService.create(createSpaceImageDto);
  }

  @Get()
  @ApiOperation({
    summary: 'space 이미지(URL) findAll API',
    description: '전체 space 이미지(URL) 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 space 이미지(URL) 목록',
    type: SpaceImage,
  })
  findAll() {
    return this.spaceImagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 space 이미지(URL) 찾는 API',
    description: 'space 이미지(URL) ID로 특정 space 이미지(URL)를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 space 이미지(URL)',
    type: SpaceImage,
  })
  findOne(@Param('id') id: string) {
    return this.spaceImagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 space 이미지(URL) 수정 API',
    description: 'space 이미지(URL) ID로 특정 space 이미지(URL)를 수정한다.',
  })
  @ApiResponse({
    status: 200,
    description: '수정된 space 이미지(URL)',
    type: SpaceImage,
  })
  update(
    @Param('id') id: string,
    @Body() updateSpaceImageDto: UpdateSpaceImageDto,
  ) {
    return this.spaceImagesService.update(+id, updateSpaceImageDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 space 이미지(URL) 삭제 API',
    description: 'space 이미지(URL) ID로 특정 space 이미지(URL) 삭제한다.',
  })
  @ApiResponse({
    status: 200,
    description: '삭제된 space 이미지(URL)',
    type: SpaceImage,
  })
  remove(@Param('id') id: string) {
    return this.spaceImagesService.remove(+id);
  }
}
