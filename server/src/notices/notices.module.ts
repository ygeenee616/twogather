import { Module } from '@nestjs/common';
import { NoticesService } from './notices.service';
import { NoticesController } from './notices.controller';
import { Notice } from './entities/notice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [TypeOrmModule],
  controllers: [NoticesController],
  providers: [NoticesService],
})
export class NoticesModule {
  constructor(private noticesService: NoticesService) {}
}
