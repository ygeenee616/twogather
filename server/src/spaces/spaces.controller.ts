import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
  Query,
} from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SpaceResExample } from './space.swagger.example';
import { GetUser } from 'src/custom.decorator';
import { User } from 'src/users/entities/users.entity';
const spaceResExample = new SpaceResExample();

@Controller('api/spaces')
@ApiTags('공간 API')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  // space 등록
  @Post()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '공간 등록 API',
    description: '새로운 공간 등록(로그인한 호스트 유저만 가능).',
  })
  @ApiResponse({
    status: 201,
    description: '새로운 공간 등록 완료',
    schema: {
      example: spaceResExample.create,
    },
  })
  async create(@GetUser() user, @Body() createSpaceDto: CreateSpaceDto) {
    const newSpace = await this.spacesService.create(createSpaceDto, user);
    return {
      status: 201,
      description: '새로운 공간 등록 완료',
      success: true,
      data: newSpace,
    };
  }

  // 전체 공간 목록 조회
  @Get()
  @ApiOperation({
    summary: '전체 공간 목록 조회 API',
    description:
      '전체 공간 목록 조회(공간 목록 전체보기 페이지), 페이지네이션 가능(localhost:3000/api/spaces?page=1&perPage=5)',
  })
  @ApiResponse({
    status: 200,
    description: '전체 공간 목록 조회',
    schema: {
      example: spaceResExample.findAll,
    },
  })
  async findAll(@Query() query) {
    const { page, perPage, keyword } = query;

    const startIndex: number = perPage * (page - 1);
    const spaces = await this.spacesService.findAll(
      startIndex,
      perPage,
      keyword,
    );
    return {
      status: 200,
      description: '전체 공간 목록 조회 성공',
      success: true,
      data: {
        spaces,
      },
    };
  }
  // type으로 공간 목록 조회
  @Get('/type/:type')
  @ApiOperation({
    summary: '공간 유형으로 공간 목록 조회 API',
    description:
      '공간 유형으로 공간 목록 조회(공간 목록 전체보기 페이지, 타입별 조회 성공)',
  })
  @ApiResponse({
    status: 200,
    description: '유형별 공간 목록 조회',
    schema: {
      example: spaceResExample.findByType,
    },
  })
  async findByType(@Param('type') type: string) {
    console.log(type);
    const spaces = await this.spacesService.findByType(type);
    return {
      status: 200,
      description:
        '공간 유형으로 공간 목록 조회(공간 목록 전체보기 페이지, 타입별 조회 성공)',
      success: true,
      data: spaces,
    };
  }

  // 내 공간 목록 조회
  @Get('/host')
  @ApiOperation({
    summary: '내가 생성한 공간 목록 조회 API',
    description: '내가 생성한 공간 목록 조회',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 200,
    description: '내가 생성한 공간 목록 조회 성공',
    schema: {
      example: spaceResExample.findMySpaces,
    },
  })
  @UseGuards(AuthGuard())
  async findMySpaces(@GetUser() user: User) {
    console.log(user.id);
    const spaces = await this.spacesService.findOneByUser(user.id);
    return {
      status: 200,
      success: true,
      description: '내가 생성한 공간 목록 조회 성공',
      data: spaces,
    };
  }

  // 공간 ID로 조회(공간 상세보기)
  @Get(':id')
  @ApiOperation({
    summary: '공간 ID로 조회 API',
    description: '공간 ID로 조회하기',
  })
  @ApiResponse({
    status: 200,
    description: 'ID로 공간 조회 성공',
    schema: {},
  })
  async findOne(@Param('id') id: number) {
    const space = await this.spacesService.findOne(+id);
    return {
      status: 200,
      success: true,
      description: 'ID로 공간 조회 성공',
      data: space,
    };
  }
  // ID로 특정 공간 정보 수정
  @Patch(':id')
  @ApiOperation({
    summary: 'ID로 특정 공간 정보 수정 API',
    description: 'ID로 특정 공간 정보 수정',
  })
  @ApiResponse({
    status: 201,
    description: 'ID로 특정 공간 정보 수정 성공',
    schema: {
      example: spaceResExample.updateSpace,
    },
  })
  async updateSpace(
    @Param('id') id: number,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ) {
    const updatedSpace = await this.spacesService.update(id, updateSpaceDto);

    return {
      status: 201,
      description: 'ID로 특정 공간 정보 수정',
      success: true,
      data: { affected: updatedSpace },
    };
  }

  // 내 공간 정보 수정
  @Patch('host/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 공간 정보 수정 API',
    description: '내 공간 정보 수정',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 201,
    description: '내 공간 정보 수정 성공',
    schema: {
      example: spaceResExample.updateMySpace,
    },
  })
  async updateMySpace(
    @GetUser() user: User,
    @Param('id') id,
    @Body() updateSpaceDto: UpdateSpaceDto,
  ) {
    const updatedSpace = await this.spacesService.updateMySpace(
      user.id,
      id,
      updateSpaceDto,
    );
    return {
      status: 201,
      description: '내 공간 정보 수정 성공',
      success: true,
      data: { affected: updatedSpace },
    };
  }

  // 특정 공간 삭제
  @Delete(':id')
  @ApiOperation({
    summary: '특정 공간 삭제 API',
    description: 'ID로 특정 공간을 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: 'ID로 특정 공간 삭제 성공',
    schema: {
      example: spaceResExample.removeSpace,
    },
  })
  async removeSpace(@Param('id') id: number) {
    await this.spacesService.remove(id);
    return {
      status: 201,
      description: 'ID로 특정 공간 삭제 성공',
      success: true,
    };
  }

  // 내 공간 삭제
  @Delete('host/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 공간 삭제 API',
    description: 'ID로 특정 공간을 삭제한다.',
  })
  @ApiHeader({
    name: 'authorization',
    description: 'Auth token',
  }) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
  @ApiResponse({
    status: 201,
    description: '내 공간 삭제 성공',
    schema: {
      example: spaceResExample.removeMySpace,
    },
  })
  async removeMySpace(@GetUser() user: User, @Param('id') id: number) {
    await this.spacesService.remove(id);
    return {
      status: 201,
      description: '내 공간 삭제 성공',
      success: true,
    };
  }
}
