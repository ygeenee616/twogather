import { Module } from '@nestjs/common';
import { HashtagsService } from './hashtags.service';
import { HashtagsController } from './hashtags.controller';
import { Hashtag } from './entities/hashtag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Space } from 'src/spaces/entities/spaces.entity';
import { PassportModule } from '@nestjs/passport';
import { SpacesModule } from 'src/spaces/spaces.module';
import { SpacesService } from 'src/spaces/spaces.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hashtag, Space]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SpacesModule,
  ],
  exports: [TypeOrmModule],
  controllers: [HashtagsController],
  providers: [HashtagsService, SpacesService],
})
export class HashtagsModule {}
