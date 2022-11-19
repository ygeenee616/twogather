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
  ForbiddenException,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { RoomResExample } from './room.swagger.example';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/custom.decorator';
import { User } from 'src/users/entities/users.entity';
import { SpacesService } from 'src/spaces/spaces.service';
const roomResExample = new RoomResExample();

@Controller('api/rooms')
@ApiTags('룸 API')
export class RoomsController {
  constructor(
    private readonly roomsService: RoomsService,
    private readonly spacesService: SpacesService,
  ) {}

  // room 생성
  @Post(':spaceId')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'room 생성 API',
    description: 'room을 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 room',
    schema: {
      example: roomResExample.create,
    },
  })
  async create(
    @Body() createRoomDto: CreateRoomDto,
    @Param('spaceId') spaceId: number,
    @GetUser() host: User,
  ) {
    const space = await this.spacesService.findOne(spaceId);

    if (space.user.id !== host.id) {
      throw new ForbiddenException(
        '자신이 호스팅하는 공간에만 룸 등록이 가능합니다.',
      );
    }
    const newRoom = await this.roomsService.create(createRoomDto, space);
    return {
      status: 201,
      description: 'room 생성완료',
      success: true,
      data: newRoom,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'room findAll API',
    description: '전체 room 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 room 목록',
    schema: {
      example: roomResExample.findAll,
    },
  })
  async findAll() {
    const rooms = await this.roomsService.findAll();
    return {
      status: 200,
      description: '전체 room 조회',
      data: rooms,
    };
  }

  @Get('space/:spaceId')
  @ApiOperation({
    summary: '특정 공간의 room 목록 조회 API',
    description: '특정 공간의 room 목록을 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 공간의 rooms',
    schema: {
      example: roomResExample.findAllBySpace,
    },
  })
  async findAllBySpace(@Param('spaceId') spaceId: number) {
    const rooms = await this.roomsService.findAllBySpace(spaceId);
    return {
      status: 200,
      success: true,
      description: 'spaceId로 rooms 조회 성공',
      data: rooms,
    };
  }

  // My Room 목록 조회
  @Get('/host')
  @ApiOperation({
    summary: '내 room 목록 조회 API',
    description: '내 room 목록 조회',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 200,
    description: '내 room 목록 조회 성공',
    schema: {
      example: roomResExample.findMyRooms,
    },
  })
  @UseGuards(AuthGuard())
  async findMyRooms(@GetUser() user: User) {
    console.log('가져오는 User의 id는 : ' + user.id);
    const rooms = await this.roomsService.findRoomsByUser(user.id);
    return {
      status: 200,
      success: true,
      description: '내 room 목록 조회 성공',
      data: rooms,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 room 찾는 API',
    description: 'room ID로 특정 room 조회',
  })
  @ApiResponse({
    status: 200,
    description: '특정 room',
    schema: {
      example: roomResExample.findOne,
    },
  })
  async findOne(@Param('id') id: number) {
    const room = await this.roomsService.findOne(+id);
    return {
      status: 200,
      success: true,
      description: 'roomId로 room 조회 성공',
      data: room,
    };
  }

  // 내 room 정보 수정
  @Patch('host/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 room 정보 수정 API',
    description: '내 room 정보를 수정한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 201,
    description: '내 room 정보 수정 성공',
    schema: {
      example: roomResExample.updateMyRoom,
    },
  })
  async updateMyRoom(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    const room = await this.roomsService.findOne(id);
    if (user.id !== room.space.user.id) {
      throw new ForbiddenException('자신의 룸만 수정 가능합니다. ');
    }
    const updatedRoom = await this.roomsService.update(id, updateRoomDto);
    return {
      status: 201,
      description: '내 room 정보 수정 성공',
      success: true,
      data: { affected: updatedRoom },
    };
  }

  // ID로 특정 room 정보 수정
  @Patch(':id')
  @ApiOperation({
    summary: 'Id로 특정 room 수정 API',
    description: 'roomId로 특정 room을 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '수정된 room',
    schema: {
      example: roomResExample.updateRoom,
    },
  })
  async updateRoom(
    @Param('id') id: number,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    const updatedRoom = await this.roomsService.update(+id, updateRoomDto);
    return {
      status: 201,
      description: 'roomId로 특정 room 정보 수정',
      success: true,
      data: { affected: updatedRoom },
    };
  }

  // 특정 room 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '특정 room 삭제 API',
    description: 'roomId로 특정 room을 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'roomId로 특정 room 삭제 성공',
    schema: {
      example: roomResExample.removeRoom,
    },
  })
  async removeRoom(@Param('id') id: number) {
    await this.roomsService.remove(+id);
    return {
      status: 201,
      description: 'ID로 특정 room 삭제 성공',
      success: true,
    };
  }

  // 내 room 삭제
  @Delete('host/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 room 삭제 API',
    description: '내 room을 삭제한다.',
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Auth token-> Bearer {token} 이렇게 넣기 ',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 201,
    description: '내 room 삭제 성공',
    schema: {
      example: roomResExample.removeRoom,
    },
  })
  async removeMyRoom(@GetUser() user: User, @Param('id') id: number) {
    const room = await this.roomsService.findOne(id);
    if (room.space.user.id !== user.id) {
      throw new UnauthorizedException('권한 없음');
    }
    await this.roomsService.remove(+id);
    return {
      status: 201,
      description: '내 room 삭제 성공',
      success: true,
    };
  }
}
