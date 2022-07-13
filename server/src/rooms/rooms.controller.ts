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
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Room } from './entities/room.entity';

@UseFilters(HttpExceptionFilter)
@Controller('rooms')
@ApiTags('룸 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  @ApiOperation({
    summary: 'room 생성 API',
    description: 'room을 생성한다.',
  })
  @ApiResponse({ status: 201, description: '생성된 room', type: Room })
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  @ApiOperation({
    summary: 'room findAll API',
    description: '전체 room 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 room 목록',
    type: Room,
  })
  findAll() {
    return this.roomsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 room 찾는 API',
    description: 'room ID로 특정 room을 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 room', type: Room })
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 room 수정 API',
    description: 'room ID로 특정 room을 수정한다.',
  })
  @ApiResponse({ status: 200, description: '수정된 room', type: Room })
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 room 삭제 API',
    description: 'room ID로 특정 room을 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 room', type: Room })
  remove(@Param('id') id: string) {
    return this.roomsService.remove(+id);
  }
}
