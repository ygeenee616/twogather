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
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { Space } from './entities/spaces.entity';

@UseFilters(HttpExceptionFilter)
@Controller('spaces')
@ApiTags('공간 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  @ApiOperation({
    summary: 'space 생성 API',
    description: 'space를 생성한다.',
  })
  @ApiResponse({ status: 201, description: '생성된 space', type: Space })
  create(@Body() createSpaceDto: CreateSpaceDto) {
    return this.spacesService.create(createSpaceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'space findAll API',
    description: '전체 space 목록을 불러온다.',
  })
  @ApiResponse({
    status: 200,
    description: '전체 space 목록',
    type: Space,
  })
  findAll() {
    return this.spacesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '특정 space 찾는 API',
    description: 'space ID로 특정 space 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 space', type: Space })
  findOne(@Param('id') id: string) {
    return this.spacesService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: '특정 space 삭제 API',
    description: 'space ID로 특정 space를 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 space', type: Space })
  remove(@Param('id') id: string) {
    return this.spacesService.remove(+id);
  }
}
