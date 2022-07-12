import { Module } from '@nestjs/common';
import { RoomImagesService } from './room_images.service';
import { RoomImagesController } from './room_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomImage } from './entities/room_image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomImage])],
  exports: [TypeOrmModule],
  controllers: [RoomImagesController],
  providers: [RoomImagesService],
})
export class RoomImagesModule {}
