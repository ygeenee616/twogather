import { Module } from '@nestjs/common';
import { QnasService } from './qnas.service';
import { QnasController } from './qnas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qna } from './entities/qna.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Qna])],
  exports: [TypeOrmModule],
  controllers: [QnasController],
  providers: [QnasService],
})
export class QnasModule {}
