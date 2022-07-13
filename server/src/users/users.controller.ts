import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader } from '@nestjs/swagger';

@UseFilters(HttpExceptionFilter)
@Controller('users')
@ApiTags('유저 API')
@ApiHeader({
  name: 'authorization',
  description: 'Auth token',
}) // 사용자 정의 헤더인데, 추후 token 필요한 곳에 추가하기
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '유저 생성 API', description: '유저를 생성한다.' })
  @ApiResponse({ status: 201, description: '생성된 유저', type: User })
  // @ApiCreatedResponse({ description: 'The record has been successfully created.'})
  // @ApiForbiddenResponse({ description: 'Forbidden.'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: '유저 findAll API',
    description: '전체 유저 목록을 불러온다.',
  })
  @ApiResponse({ status: 200, description: '전체 유저 목록', type: User })
  findAll() {
    try {
      const users: Promise<User[]> = this.usersService.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  @ApiOperation({
    summary: '특정 유저 찾는 API',
    description: '유저의 ID로 특정 유저를 불러온다.',
  })
  @ApiResponse({ status: 200, description: '특정 유저', type: User })
  findOneById(@Param('id') id: number): Promise<User> {
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  @ApiOperation({
    summary: '특정 유저 삭제 API',
    description: '유저의 ID로 특정 유저를 삭제한다.',
  })
  @ApiResponse({ status: 200, description: '삭제된 유저', type: User })
  remote(@Param('id') id: number) {
    try {
      this.usersService.remove(id);
    } catch (error) {
      error;
    }
  }
}
