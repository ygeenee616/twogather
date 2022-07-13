import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/users.entity';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  @ApiOperation({
    summary: '회원가입 API',
    description: '유저를 생성한다.(이름, 성별, 프로필 사진, 휴대폰 번호, )',
  })
  @ApiCreatedResponse({
    description: '유저 생성 완료(입력값 외 null값).',
    type: Object,
  })
  async signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: '로그인 API', description: '로그인한다.' })
  @ApiCreatedResponse({
    description: '로그인 성공, access token 발급.',
  })
  async login(@Req() req, @Body(ValidationPipe) userData: AuthCredentialDto) {
    const accessToken = await this.usersService.login(userData);
    return {
      statusCode: 200,
      message: '로그인 성공',
      accessToken: accessToken,
    };
  }
  @Get()
  @ApiOperation({
    summary: '유저 목록 조회 API',
    description: '전체 유저를 조회한다.',
  })
  @ApiResponse({ description: '전체 유저 조회', type: User })
  findAll() {
    try {
      const users: Promise<User[]> = this.usersService.findAll();
      return {
        statusCode: 200,
        message: '유저 조회 성공',
        data: users,
      };
    } catch (error) {
      throw error;
    }
  }

  // 내 정보조회
  @Get('/info')
  @ApiOperation({
    summary: '내 정보 조회 API',
    description: '내 정보를 조회한다.',
  })
  @ApiCreatedResponse({ description: '내 정보 조회', type: User })
  @UseGuards(AuthGuard())
  findMyInfo(@Req() req) {
    return {
      statusCode: 200,
      message: 'so 조회 성공',
      data: req.users,
    };
  }

  // admin 기능
  @Get('/:id')
  @ApiOperation({
    summary: '특정 유저 조회 API',
    description: '특정 유저를 조회한다.',
  })
  @ApiCreatedResponse({ description: '특정 유저 조회', type: User })
  findOneById(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  // admin 기능
  @Get('/email/:email')
  @ApiOperation({
    summary: 'email로 조회 API',
    description: 'email로 특정 유저를 조회한다.',
  })
  @ApiCreatedResponse({ description: 'email로 조회', type: User })
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  //마이페이지 수정
  @Patch()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 정보 수정 API',
    description: '내 정보를 수정한다.',
  })
  @ApiCreatedResponse({ description: '내 정보 수정', type: User })
  updateUserInfo(@Req() req, @Body() userData: UpdateUserDto) {
    const updatedUser = this.usersService.update(req.user.id, userData);
    return updatedUser;
  }

  // admin 기능
  @Delete('/:id')
  @ApiOperation({
    summary: '특정 유저 삭제 API',
    description: '특정 유저를 삭제한다.',
  })
  @ApiCreatedResponse({ description: '내 정보 조회', type: User })
  remote(@Param('id') id: number) {
    this.usersService.remove(id);
  }

  // 회원 탈퇴
  @Delete()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '회원 탈퇴 API',
    description: '회원 탈퇴를 진행한다.',
  })
  @ApiCreatedResponse({ description: '회원 탈퇴 성공', type: User })
  withdrawal(@Req() req) {
    return this.usersService.remove(req.user.id);
  }
}
