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
import { RoomImagesService } from './room_images.service';
import { CreateRoomImageDto } from './dto/create-room_image.dto';
import { UpdateRoomImageDto } from './dto/update-room_image.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { RoomImage } from './entities/room_image.entity';

@UseFilters(HttpExceptionFilter)
@Controller('room-images')
@ApiTags('룸 이미지 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class RoomImagesController {
  constructor(private readonly roomImagesService: RoomImagesService) {}

  @Post()
  @ApiOperation({
    summary: '룸 이미지(URL) 생성 API',
    description: '룸 이미지(URL) 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 룸 이미지(URL)',
    type: RoomImage,
  })
  create(@Body() createRoomImageDto: CreateRoomImageDto) {
    return this.roomImagesService.create(createRoomImageDto);
  }

  @Get()
  @ApiOperation({
    summary: '룸 이미지(URL) findAll API',
    description: '전체 룸 이미지(URL) 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 룸 이미지(URL) 목록',
    type: RoomImage,
  })
  findAll() {
    return this.roomImagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 룸 이미지(URL) 찾는 API',
    description: '룸 이미지(URL) ID로 특정 룸 이미지(URL)를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 룸 이미지(URL)',
    type: RoomImage,
  })
  findOne(@Param('id') id: string) {
    return this.roomImagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 룸 이미지(URL) 수정 API',
    description: '룸 이미지(URL) ID로 특정 룸 이미지(URL)를 수정한다.',
  })
  @ApiResponse({
    status: 200,
    description: '수정된 룸 이미지(URL)',
    type: RoomImage,
  })
  update(
    @Param('id') id: string,
    @Body() updateRoomImageDto: UpdateRoomImageDto,
  ) {
    return this.roomImagesService.update(+id, updateRoomImageDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 룸 이미지(URL) 삭제 API',
    description: '룸 이미지(URL) ID로 특정 룸 이미지(URL)를 삭제한다.',
  })
  @ApiResponse({
    status: 200,
    description: '삭제된 룸 이미지(URL)',
    type: RoomImage,
  })
  remove(@Param('id') id: string) {
    return this.roomImagesService.remove(+id);
  }
}
