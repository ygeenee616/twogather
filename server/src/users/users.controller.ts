import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserResExample } from './user.swagger.example';
import { GetAdminUser, GetUser } from 'src/custom.decorator';
import { User } from './entities/users.entity';
import { KakaoAuthGuard } from './guards/kakao-auth.guard';
import { generateRandomPassword } from '../utils/generate-random-password';
const userResExample = new UserResExample();

@Controller('api/users')
@ApiTags('유저 API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 회원가입
  @Post('/sign-up')
  @ApiOperation({
    summary: '회원가입 API',
    description: '유저를 생성한다.(이름, 성별, 프로필 사진, 휴대폰 번호, )',
  })
  @ApiResponse({
    status: 201,
    description: '유저 생성 완료',
    schema: {
      example: userResExample.signUp,
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

  // 로그인
  @Post('/sign-in')
  @ApiOperation({ summary: '로그인 API', description: '로그인한다.' })
  @ApiResponse({
    status: 200,
    description: '로그인 성공, access token 발급.',
    schema: {
      example: userResExample.signIn,
    },
  })
  async signIn(@Req() req, @Body(ValidationPipe) userData: AuthCredentialDto) {
    const accessToken = await this.usersService.login(userData);
    return {
      statusCode: 200,
      message: '로그인 성공',
      success: true,
      accessToken: accessToken,
    };
  }

  // 유저 목록 조회
  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '유저 목록 조회 API',
    description: '전체 유저를 조회한다.(admin)',
  })
  @ApiResponse({
    status: 200,
    description: '전체 유저 조회',
    schema: {
      example: userResExample.getAll,
    },
  })
  @ApiBearerAuth('userToken')
  async getAll(@GetAdminUser() admin: User) {
    const users = await this.usersService.findAll();
    return {
      statusCode: 200,
      success: true,
      message: '유저 조회 성공',
      data: users,
    };
  }

  // 내 정보조회
  @Get('/info')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 정보 조회 API',
    description: '내 정보를 조회한다.',
  })
  @ApiResponse({
    status: 200,
    description: '내 정보 조회',
    schema: {
      example: userResExample.getMyInfo,
    },
  })
  @ApiBearerAuth('userToken')
  async getMyInfo(@GetUser() user: User) {
    const userInfo = await this.usersService.findOne(user.id);
    return {
      statusCode: 200,
      success: true,
      message: '내 정보 조회 성공',
      data: userInfo,
    };
  }

  // admin 기능
  @Get('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '특정 유저 조회 API',
    description: '특정 유저를 조회한다.(admin)',
  })
  @ApiResponse({
    status: 200,
    description: '특정 유저 조회',
    schema: {
      example: userResExample.getOneById,
    },
  })
  @ApiBearerAuth('userToken')
  async getOneById(@Param('id') id: number, @GetAdminUser() admin: User) {
    const user = await this.usersService.findOne(id);
    return {
      statusCode: 200,
      success: true,
      message: '특정 유저 정보 조회 성공',
      data: user,
    };
  }

  // 이메일로 유저 조회
  @Get('/email/:email')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'email로 조회 API',
    description: 'email로 특정 유저를 조회한다.(admin)',
  })
  @ApiResponse({
    status: 200,
    description: '이메일로 조회 성공',
    schema: {
      example: userResExample.getOneByEmail,
    },
  })
  @ApiBearerAuth('userToken')
  async getOneByEmail(
    @Param('email') email: string,
    @GetAdminUser() admin: User,
  ) {
    const user = await this.usersService.findOneByEmail(email);
    return {
      status: 200,
      success: true,
      description: '이메일로 조회 성공',
      data: user,
    };
  }

  //마이페이지 수정
  @Patch()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '내 정보 수정 API',
    description: '내 정보를 수정한다.',
  })
  @ApiResponse({
    status: 201,
    description: '내 정보 수정 성공',
    schema: {
      example: userResExample.updateUserInfo,
    },
  })
  @ApiBearerAuth('userToken')
  async updateUserInfo(
    @Req() req,
    @Body(ValidationPipe) userData: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(req.user.id, userData);

    return { status: 201, description: '내 정보 수정 성공', data: updatedUser };
  }

  // admin 기능
  @Delete('/:id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: '특정 유저 삭제 API',
    description: '특정 유저를 삭제한다.(admin)',
  })
  @ApiResponse({
    status: 201,
    description: '특정 유저 삭제 성공',
    schema: {
      example: userResExample.removeUser,
    },
  })
  @ApiBearerAuth('userToken')
  async removeUser(@Param('id') id: number, @GetAdminUser() admin: User) {
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
  @ApiBearerAuth('userToken')
  @ApiOperation({
    summary: '회원 탈퇴 API',
    description: '회원 탈퇴를 진행한다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원 탈퇴 성공',
    schema: {
      example: userResExample.wihdrawal,
    },
  })
  async withdrawal(@GetUser() user) {
    await this.usersService.remove(user.id);
    return {
      status: 201,
      description: '회원 탈퇴 성공',
      success: true,
    };
  }

  // 카카오 로그인
  @ApiOperation({
    summary: '카카오 로그인',
    description: '카카오 로그인을 하는 API입니다.',
  })
  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao')
  async kakaoLogin() {
    return;
  }

  @ApiOperation({
    summary: '카카오 로그인 콜백',
    description: '카카오 로그인시 콜백 라우터입니다.',
  })
  @UseGuards(KakaoAuthGuard)
  @Get('auth/kakao/callback')
  async kakaocallback(@Req() req, @Res() res) {
    console.log(req.user);
    if (req.user.type === 'login') {
      // res.cookie('access_token', req.user.access_token);
      // res.cookie('refresh_token', req.user.refresh_token);
      return {
        statusCode: 200,
        message: '로그인 성공',
        success: true,
        accessToken: req.user.access_token,
      };
    } else {
      // res.cookie('once_token', req.user.once_token);
      const kakaoUserInfo: CreateUserDto = {
        email: req.user_email,
        password: process.env.KAKAO_KEY,
        nickname: req.user_nick,
        loginType: req.user_provider,
      };
      await this.usersService.createKakaoUser(kakaoUserInfo);
      return {
        statusCode: 200,
        message: '로그인 성공',
        success: true,
        accessToken: req.user.access_token,
      };
    }
    // res.redirect('http://localhost:5001/register');
    // res.end();
  }

  @Post('reset-password')
  @ApiOperation({
    summary: '비밀번호 찾기(비밀번호 초기화) API',
    description: '비밀번호 초기화를 진행한다.',
  })
  @ApiResponse({
    status: 201,
    description: '비밀번호 초기화 후 이메일 전송 성공',
    schema: {
      // example:
    },
  })
  async resetPasswordUser(@Body() dto) {
    const { email } = dto;
    // email로 가입된 유저인 지 확인
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    // 랜덤 패스워드 생성
    const newPassword = generateRandomPassword();

    // user password 업데이트
    const updatedUser = await this.usersService.updatePassword(
      user.id,
      newPassword,
    );

    // 변경된 패스워드 이메일 발송
    await this.usersService.sendMemberResetPassword(email, newPassword);

    return {
      status: 201,
      description: '특정 유저 비밀번호 초기화 성공',
      success: true,
    };
  }
}
