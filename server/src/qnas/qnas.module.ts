import { Module } from '@nestjs/common';
import { QnasService } from './qnas.service';
import { QnasController } from './qnas.controller';

@Module({
  controllers: [QnasController],
  providers: [QnasService]
})
export class QnasModule {}
