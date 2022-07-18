import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpaceImagesService } from './space_images.service';
import { CreateSpaceImageDto } from './dto/create-space_image.dto';
import { UpdateSpaceImageDto } from './dto/update-space_image.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { SpaceImage } from './entities/space_image.entity';
import { SpaceImageResExample } from './space_image.swagger.example';
const spaceImageResExample = new SpaceImageResExample();

@Controller('api/space-images')
@ApiTags('공간 이미지 API')
// @ApiHeader({
//   name: 'authorization',
//   description: 'Auth token',
// }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class SpaceImagesController {
  constructor(private readonly spaceImagesService: SpaceImagesService) {}

  // spaceImage 등록
  @Post(':spaceId')
  @ApiOperation({
    summary: 'space 이미지(URL) 생성 API',
    description: 'space 이미지(URL)를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 space 이미지(URL)',
    schema: {
      example: spaceImageResExample.create,
    },
  })
  async create(
    @Body() createSpaceImageDto: CreateSpaceImageDto,
    @Param('spaceId') spaceId: number,
  ) {
    const newSpaceImage = await this.spaceImagesService.create(
      createSpaceImageDto,
      spaceId,
    );
    return {
      status: 201,
      description: '새로운 space 이미지 등록 완료',
      success: true,
      data: newSpaceImage,
    };
  }

  // 전체 spaceImage URL 목록 조회
  @Get()
  @ApiOperation({
    summary: 'space 이미지(URL) findAll API',
    description: '전체 space 이미지(URL) 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 space 이미지(URL) 목록',
    schema: {
      example: spaceImageResExample.findAll,
    },
  })
  async findAll() {
    const spaceImages = await this.spaceImagesService.findAll();
    return {
      status: 200,
      description: '전체 space 이미지(URL) 목록 조회 성공',
      success: true,
      data: spaceImages,
    };
  }

  // 특정 공간의 spaceImage URL 목록 조회
  @Get('space/:spaceId')
  @ApiOperation({
    summary: '특정 공간의 space 이미지(URL) findAll API',
    description: '특정 공간의 space 이미지(URL) 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 공간의 space 이미지(URL) 목록',
    schema: {
      example: spaceImageResExample.findAllBySpace,
    },
  })
  async findAllBySpace(@Param('spaceId') spaceId: number) {
    const spaceImages = await this.spaceImagesService.findAllBySpace(spaceId);
    return {
      status: 200,
      description: '특정 공간의 space 이미지(URL) 목록 조회 성공',
      success: true,
      data: spaceImages,
    };
  }

  // Id로 특정 spaceImage URL 조회
  @Get(':id')
  @ApiOperation({
    summary: '특정 space 이미지(URL) 찾는 API',
    description: 'space 이미지(URL) ID로 특정 space 이미지(URL)를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 space 이미지(URL)',
    schema: {
      example: spaceImageResExample.findOne,
    },
  })
  async findOne(@Param('id') id: number) {
    const spaceImage = await this.spaceImagesService.findOne(+id);
    return {
      status: 200,
      success: true,
      description: 'Id로 spaceImage URL 조회 성공',
      data: spaceImage,
    };
  }

  // spaceImageId로 특정 spaceImage(URL) 수정
  @Patch(':id')
  @ApiOperation({
    summary: '특정 space 이미지(URL) 수정 API',
    description: 'space 이미지(URL) ID로 특정 space 이미지(URL)를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'space 이미지(URL) 수정 성공',
    schema: {
      example: spaceImageResExample.updateSpaceImage,
    },
  })
  async updateSpaceImage(
    @Param('id') id: number,
    @Body() updateSpaceImageDto: UpdateSpaceImageDto,
  ) {
    const updatedSpaceImage = await this.spaceImagesService.update(
      +id,
      updateSpaceImageDto,
    );
    return {
      status: 201,
      description: 'spaceImageId로 특정 Image(URL) 정보 수정',
      success: true,
      data: { affected: updatedSpaceImage },
    };
  }

  // 특정 spaceImage 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '특정 space 이미지(URL) 삭제 API',
    description: 'space 이미지(URL) ID로 특정 space 이미지(URL) 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'Id로 space 이미지(URL) 삭제 성공',
    schema: {
      example: spaceImageResExample.removeSpaceImage,
    },
  })
  async removeSpaceImage(@Param('id') id: number) {
    await this.spaceImagesService.remove(+id);
    return {
      status: 201,
      description: 'spaceImageId로 특정 spaceImage 삭제 성공',
      success: true,
    };
  }
}
