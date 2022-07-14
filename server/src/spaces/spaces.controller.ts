import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Space } from './entities/spaces.entity';
import { AuthGuard } from '@nestjs/passport';
import { SpaceResExample } from './space.swagger.example';
const spaceResExample = new SpaceResExample();

@Controller('api/spaces')
@ApiTags('space API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  // space 등록
  @Post()
  @ApiOperation({
    summary: 'space 생성 API',
    description: 'space를 생성한다.',
  })
  @ApiResponse({
    status: 201,
    description: '생성된 space',
    schema: {
      example: spaceResExample.create,
    },
  })
  async create(@Body() createSpaceDto: CreateSpaceDto) {
    const newSpace = await this.spacesService.create(createSpaceDto);
    return {
      status: 201,
      description: 'space 생성 완료',
      success: true,
    };
  }

  @Get()
  @ApiOperation({
    summary: 'space findAll API',
    description: '전체 space 조회',
  })
  @ApiResponse({
    status: 200,
    description: '전체 space 조회',
    schema: {
      example: spaceResExample.findAll,
    },
  })
  async findAll() {
    const spaces = await this.spacesService.findAll();
    return {
      status: 200,
      description: '전체 space 조회',
      data: spaces,
    };
  }

  // 로그인 한 사람의 생성한 모든 space 조회
  @Get('/lists')
  @ApiOperation({
    summary: '내가 생성한 space 목록조회 API',
    description: '내가 생성한 모든 space 조회',
  })
  @ApiResponse({
    status: 200,
    description: '내가 생성한 모든 space 조회',
    schema: {
      example: spaceResExample.getMySpaces,
    },
  })
  @UseGuards(AuthGuard())
  async getMySpaces(@Req() req) {
    const spaces = await this.spacesService.findOneByUserId(req.user.id);
    return {
      status: 200,
      success: true,
      message: '내가 생성한 모든 space 조회 성공',
      data: spaces,
    };
  }

  // 상세보기 눌렀을 때?
  @Get(':id')
  @ApiOperation({
    summary: '특정 space 찾는 API',
    description: 'space ID로 특정 space 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '특정 space',
    schema: {
      example: spaceResExample.findOne,
    },
  })
  async findOne(@Param('id') id: number) {
    const space = await this.spacesService.findOne(+id);
    return {
      status: 200,
      success: true,
      message: '특정 space 조회 성공',
      data: space,
    };
  }

  @Patch(':id')
  @ApiOperation({
    summary: '특정 space 수정 API',
    description: '특정 space 정보 수정',
  })
  @ApiResponse({
    status: 201,
    description: '특정 space 정보 수정 성공',
    schema: {
      example: spaceResExample.updateSpace,
    },
  })
  async updateSpace(
    @Param('id') id: number,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ) {
    const updatedSpace = await this.spacesService.update(+id, updateSpaceDto);

    return {
      status: 201,
      description: 'space 정보 수정 성공',
      data: updatedSpace,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 space 삭제 API',
    description: 'space ID로 특정 space를 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '특정 space 삭제 성공',
    schema: {
      example: spaceResExample.removeSpace,
    },
  })
  async removeSpace(@Param('id') id: number) {
    await this.spacesService.remove(+id);
    return {
      status: 201,
      description: '특정 space 삭제 성공',
      success: true,
    };
  }
}
