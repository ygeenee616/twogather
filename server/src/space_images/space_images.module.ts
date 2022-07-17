import { Module } from '@nestjs/common';
import { SpaceImagesService } from './space_images.service';
import { SpaceImagesController } from './space_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceImage } from './entities/space_image.entity';
import { SpacesModule } from 'src/spaces/spaces.module';
import { SpacesService } from 'src/spaces/spaces.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceImage]), SpacesModule],
  exports: [TypeOrmModule],
  controllers: [SpaceImagesController],
  providers: [SpaceImagesService, SpacesService],
})
export class SpaceImagesModule {
  constructor(private spaceImagesService: SpaceImagesService) {}
}
