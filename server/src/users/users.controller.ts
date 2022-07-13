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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  async signup(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Post('/sign-in')
  async login(@Req() req, @Body(ValidationPipe) userData: AuthCredentialDto) {
    const accessToken = await this.usersService.login(userData);
    return accessToken;
  }
  @Get()
  findAll() {
    try {
      const users: Promise<User[]> = this.usersService.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  // 내 정보조회
  @Get('/info')
  @UseGuards(AuthGuard())
  findMyInfo(@Req() req) {
    return req.user;
  }

  @Get('/:id')
  findOneById(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Patch()
  @UseGuards(AuthGuard())
  updateUserInfo(@Req() req, @Body() userData: UpdateUserDto) {
    const updatedUser = this.usersService.update(req.user.id, userData);
    return updatedUser;
  }

  @Delete('/:id')
  remote(@Param('id') id: number) {
    this.usersService.remove(id);
  }

  @Delete()
  @UseGuards(AuthGuard())
  withdrawal(@Req() req) {
    return this.usersService.remove(req.user.id);
  }
}
