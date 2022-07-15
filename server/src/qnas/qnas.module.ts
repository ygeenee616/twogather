import { Module } from '@nestjs/common';
import { QnasService } from './qnas.service';
import { QnasController } from './qnas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Qna } from './entities/qna.entity';
import { SpacesModule } from 'src/spaces/spaces.module';
import { SpacesService } from 'src/spaces/spaces.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Qna]),
    SpacesModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [TypeOrmModule],
  controllers: [QnasController],
  providers: [QnasService, SpacesService],
})
export class QnasModule {
  constructor(private qnasService: QnasService) {}
}
