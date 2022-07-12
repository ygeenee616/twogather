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

@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
    try {
      return this.usersService.findOne(id);
    } catch (error) {
      throw error;
    }
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
