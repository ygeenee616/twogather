import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { EmailService } from 'src/email/email.service';
import { User } from './entities/users.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: 60 * 60 * 10,
      },
    }),
  ],
  exports: [TypeOrmModule, UsersService, JwtStrategy, PassportModule],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy, KakaoStrategy, EmailService],
})
export class UsersModule {
  constructor(private usersService: UsersService) {}
}
