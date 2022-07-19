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
import { RoomImagesService } from './room_images.service';
import { CreateRoomImageDto } from './dto/create-room_image.dto';
import { UpdateRoomImageDto } from './dto/update-room_image.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { RoomImage } from './entities/room_image.entity';
import { RoomImageResExample } from './room_image.swagger.example';
import { GetUser } from 'src/custom.decorator';
import { User } from 'src/users/entities/users.entity';
import { AuthGuard } from '@nestjs/passport';
const roomImageResExample = new RoomImageResExample();

@Controller('api/room-images')
@ApiTags('룸 이미지 API')
export class RoomImagesController {
  constructor(private readonly roomImagesService: RoomImagesService) {}

  // roomImage(URL) 생성
  @Post(':roomId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '룸 이미지(URL) 생성 API',
    description: '룸 이미지(URL) 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 룸 이미지(URL)',
    schema: {
      example: roomImageResExample.create,
    },
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async create(
    @Body() createRoomImageDto: CreateRoomImageDto,
    @Param('roomId') roomId: number,
    @GetUser() host: User,
  ) {
    const newRoomImage: RoomImage = await this.roomImagesService.create(
      createRoomImageDto,
      roomId,
    );
    return {
      status: 201,
      description: '새로운 roomImage 등록 완료',
      success: true,
      data: newRoomImage,
    };
  }

  // 전체 roomImage URL 목록 조회
  @Get()
  @ApiOperation({
    summary: '룸 이미지(URL) findAll API',
    description: '전체 룸 이미지(URL) 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 룸 이미지(URL) 목록',
    schema: {
      example: roomImageResExample.findAll,
    },
  })
  async findAll() {
    const roomImages = await this.roomImagesService.findAll();
    return {
      status: 200,
      description: '전체 roomImages(URL) 목록 조회 성공',
      success: true,
      data: roomImages,
    };
  }

  // 특정 룸의 roomImage URL 목록 조회
  @Get('room/:roomId')
  @ApiOperation({
    summary: '특정 룸의 이미지(URL) findAll API',
    description: '특정 룸의 이미지(URL) 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 룸의 이미지(URL) 목록',
    schema: {
      example: roomImageResExample.findAllByRoom,
    },
  })
  async findAllByRoom(@Param('roomId') roomId: number) {
    const roomImages = await this.roomImagesService.findAllByRoom(roomId);
    return {
      status: 200,
      description: '특정 룸의 roomImages(URL) 목록 조회 성공',
      success: true,
      data: roomImages,
    };
  }

  // Id로 특정 roomImage(URL) 조회
  @Get(':id')
  @ApiOperation({
    summary: '특정 룸 이미지(URL) 찾는 API',
    description: '룸 이미지(URL) ID로 특정 룸 이미지(URL)를 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 룸 이미지(URL)',
    schema: {
      example: roomImageResExample.findOne,
    },
  })
  async findOne(@Param('id') id: number) {
    const roomImage = await this.roomImagesService.findOne(+id);
    return {
      status: 200,
      success: true,
      description: 'Id로 roomImage(URL) 조회 성공',
      data: roomImage,
    };
  }

  // roomImageId로 특정 roomImage(URL) 수정
  @Patch(':id')
  @ApiOperation({
    summary: '특정 룸 이미지(URL) 수정 API',
    description: '룸 이미지(URL) ID로 특정 룸 이미지(URL)를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '룸 이미지(URL) 수정 성공',
    schema: {
      example: roomImageResExample.updateRoomImage,
    },
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  })
  async updateRoomImage(
    @Param('id') id: number,
    @Body() updateRoomImageDto: UpdateRoomImageDto,
  ) {
    const updatedRoomImage = await this.roomImagesService.update(
      +id,
      updateRoomImageDto,
    );
    return {
      status: 201,
      description: 'roomImageId로 특정 roomImage(URL) 정보 수정',
      success: true,
      data: { affected: updatedRoomImage },
    };
  }

  // roomImageId로 특정 roomImage 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '특정 룸 이미지(URL) 삭제 API',
    description: '룸 이미지(URL) ID로 특정 룸 이미지(URL)를 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'Id로 룸 이미지(URL) 삭제 성공',
    schema: {
      example: roomImageResExample.removeRoomImage,
    },
  })
  async removeRoomImage(@Param('id') id: number) {
    await this.roomImagesService.remove(+id);
    return {
      status: 201,
      description: 'roomImageId로 특정 roomImage 삭제 성공',
      success: true,
    };
  }
}
