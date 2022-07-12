import { Module } from '@nestjs/common';
import { SpaceImagesService } from './space_images.service';
import { SpaceImagesController } from './space_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpaceImage } from './entities/space_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpaceImage])],
  exports: [TypeOrmModule],
  controllers: [SpaceImagesController],
  providers: [SpaceImagesService],
})
export class SpaceImagesModule {}
