import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 유저 생성
  async register(userData: CreateUserDto): Promise<User> {
    const newUser: User = this.usersRepository.create(userData);
    const salt: string = await bcrypt.genSalt();
    const { password } = newUser;
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser.password = hashedPassword;
    try {
      await this.usersRepository.save(newUser);
      newUser.password = null;
      return newUser;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 존재하는 이메일입니다. ');
      } else {
        throw new InternalServerErrorException();
      }
      throw error;
    }
  }

  async login(userData: AuthCredentialDto): Promise<string> {
    const { email, password } = userData;
    const user = await this.usersRepository.findOneBy({ email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { email };

      const accessToken = await this.jwtService.sign(payload);
      return accessToken;
    } else {
      throw new UnauthorizedException('잘못된 이메일 또는 비밀번호 입니다.');
    }
  }
  // 유저 전체 조회
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  // id로 유저 조회
  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({
        id,
      });
    } catch (error) {
      throw error;
    }
  }

  // email로 유저 조회
  async findOneByEmail(email: string): Promise<User> {
    try {
      console.log('service: ', email);
      return this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.update(id, updateUserDto);
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
