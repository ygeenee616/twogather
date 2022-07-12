import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';
import { Hashtag } from './entities/hashtag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hashtag])],
  exports: [TypeOrmModule],
  controllers: [HashtagsController],
  providers: [HashtagsService],
})
export class HashtagsModule {}
