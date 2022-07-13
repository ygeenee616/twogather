import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { CreateUserDto } from './dto/create-user.dto';
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
  @UseGuards(AuthGuard())
  async login(
    @Req() req,
    @Res() res,
    @Body(ValidationPipe) userData: AuthCredentialDto,
  ) {
    const accessToken = await this.usersService.login(userData);
    res.json({ accessToken: accessToken });
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
  @Get('/:id')
  findOneById(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }

  @Delete('/:id')
  remote(@Param('id') id: number) {
    try {
      this.usersService.remove(id);
    } catch (error) {
      error;
    }
  }
}
