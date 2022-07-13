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
  ApiBasicAuth,
} from '@nestjs/swagger';
import { UserResExample } from './user.swagger.example';
const userResExample = new UserResExample();
@Controller('api/users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  @ApiOperation({
    summary: '회원가입 API',
    description: '유저를 생성한다.(이름, 성별, 프로필 사진, 휴대폰 번호, )',
  })
  @ApiResponse({
    status: 201,
    description: '유저 생성 완료',
    schema: {
      example: userResExample.signup,
    },
  })
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const newUser = await this.usersService.register(createUserDto);
    return {
      status: 201,
      description: '유저 생성 완료(입력값 외 null값).',
      success: true,
    };
  }

  @Post('/sign-in')
  @ApiOperation({ summary: '로그인 API', description: '로그인한다.' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공, access token 발급.',
    type: String,
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
  @ApiResponse({
    status: 200,
    description: '전체 유저 조회',
  })
  async getAll() {
    const users = await this.usersService.findAll();
    return {
      statusCode: 200,
      message: '유저 조회 성공',
      data: users,
    };
  }

  // 내 정보조회
  @Get('/info')
  @ApiOperation({
    summary: '내 정보 조회 API',
    description: '내 정보를 조회한다.',
  })
  @ApiResponse({ status: 200, description: '내 정보 조회', type: User })
  @UseGuards(AuthGuard())
  async getMyInfo(@Req() req) {
    console.log(req.user);
    const user = await this.usersService.findOne(req.user.id);
    return {
      statusCode: 200,
      message: '내 정보 조회 성공',
      data: user,
    };
  }

  // admin 기능
  @Get('/:id')
  @ApiOperation({
    summary: '특정 유저 조회 API',
    description: '특정 유저를 조회한다.',
  })
  @ApiResponse({ status: 200, description: '특정 유저 조회', type: User })
  async getOneById(@Param('id') id: number): Promise<User> {
    return await this.usersService.findOne(id);
  }

  // admin 기능
  @Get('/email/:email')
  @ApiOperation({
    summary: 'email로 조회 API',
    description: 'email로 특정 유저를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '이메일로 조회 성공',
    schema: {
      example: {
        status: 200,
        description: '이메일로 조회 성공',
        data: {
          id: 41,
          nickname: 'test678',
          email: 'test678@naver.com',
          password:
            '$2a$10$NWv0JutXwYJUaA8oUX45weRdBNuTpO3AjjlizhdSpUDcwjNwV2k7q',
          name: null,
          sex: null,
          profileImage: null,
          phoneNumber: null,
          businessNumber: null,
          businessName: null,
          businessAddress: null,
          accountNumber: null,
        },
      },
    },
  })
  async getOneByEmail(@Param('email') email: string) {
    const user = await this.usersService.findOneByEmail(email);
    console.log(user);
    return { status: 200, description: '이메일로 조회 성공', data: user };
  }

  //마이페이지 수정
  @Patch()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 정보 수정 API',
    description: '내 정보를 수정한다.',
  })
  @ApiResponse({ status: 201, description: '내 정보 수정 성공' })
  updateUserInfo(@Req() req, @Body(ValidationPipe) userData: UpdateUserDto) {
    const updatedUser = this.usersService.update(req.user.id, userData);
    return { status: 201, description: '내 정보 수정 성공', data: updatedUser };
  }

  // admin 기능
  @Delete('/:id')
  @ApiOperation({
    summary: '특정 유저 삭제 API',
    description: '특정 유저를 삭제한다.',
  })
  @ApiResponse({
    status: 201,
    description: '특정 유저 삭제 성공',
    schema: {
      example: { success: true },
    },
  })
  async removeUser(@Param('id') id: number) {
    await this.usersService.remove(id);
    return {
      status: 201,
      description: '특정 유저 삭제 성공',
      success: true,
    };
  }

  // 회원 탈퇴
  @Delete()
  @UseGuards(AuthGuard())
  @ApiBasicAuth()
  @ApiOperation({
    summary: '회원 탈퇴 API',
    description: '회원 탈퇴를 진행한다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원 탈퇴 성공',
    type: User,
  })
  async withdrawal(@Req() req) {
    await this.usersService.remove(req.user.id);
    return {
      status: 201,
      description: '특정 유저 삭제 성공',
      success: true,
    };
  }
}
