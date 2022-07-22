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
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { isAdmin: user.isAdmin, email: email };
      const accessToken = await this.jwtService.sign(payload);
      return accessToken;
    } else {
      throw new UnauthorizedException('잘못된 이메일 또는 비밀번호 입니다.');
    }
  }
  // 유저 전체 조회
  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw error;
    }
  }

  // id로 유저 조회
  async findOne(id: number): Promise<User> {
    try {
      return await this.usersRepository.findOne({
        where: {
          id,
        },
        relations: {
          reservations: {
            review: true,
            room: {
              space: true,
            },
          },
          qnas: {
            space: true,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  // email로 유저 조회
  async findOneByEmail(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw error;
    }
  }

  // 유저 갱신
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      let updateUser = null;
      if (updateUserDto.password !== undefined) {
        const { password, ...updateUserInfo } = updateUserDto;
        const salt: string = await bcrypt.genSalt();
        const hashedPassword: string = await bcrypt.hash(password, salt);
        updateUser = { password: hashedPassword, ...updateUserInfo };
      } else {
        updateUser = updateUserDto;
      }
      const user = await this.usersRepository.update(id, updateUser);

      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  // 유저 비밀번호 갱신
  async updatePassword(id: number, newPassword: string): Promise<User> {
    try {
      const user = await this.usersRepository.update(id, {
        password: newPassword,
      });

      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  // 유저 프로필 이미지 갱신
  async updateProfileImage(id: number, profileImage: string): Promise<User> {
    try {
      const user = await this.usersRepository.update(id, {
        profileImage,
      });

      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  // 유저 삭제
  async remove(id: number): Promise<void> {
    try {
      const deleteUser = await this.usersRepository.delete(id);
      if (!deleteUser.affected) {
        throw new NotFoundException({ description: '삭제할 유저가 없습니다.' });
      }
    } catch (error) {
      throw error;
    }
  }

  // 소셜 로그인(카카오)
  async createKakaoUser(kakaoUserInfo: CreateUserDto) {
    try {
      await this.usersRepository.save(kakaoUserInfo);
    } catch (error) {
      throw error;
    }
  }

  async findUserById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }

  async validateUser(email: string): Promise<any> {
    const user = await this.usersRepository
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
    if (!user) {
      return null;
    }
    return user;
  }

  // 로그인 토큰 발급
  async createLoginToken(user: User) {
    const payload = {
      userId: user.id,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });
  }

  // 리프레쉬 토큰 발급
  async createRefreshToken(user: User) {
    const payload = {
      userId: user.id,
      user_token: 'refreshToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '50m',
    });

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ user_refresh_token: token })
      .where(`userId = ${user.id}`)
      .execute();
    return refresh_token;
  }

  // 1회용 토큰 발급
  onceToken(user_profile: any) {
    const payload = {
      user_email: user_profile.user_email,
      user_nick: user_profile.user_nick,
      user_provider: user_profile.user_provider,
      user_token: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });
  }

  // 토큰 검증
  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
