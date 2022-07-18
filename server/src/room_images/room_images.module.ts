import { Module } from '@nestjs/common';
import { RoomImagesService } from './room_images.service';
import { RoomImagesController } from './room_images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomImage } from './entities/room_image.entity';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomsService } from 'src/rooms/rooms.service';
import { SpacesModule } from 'src/spaces/spaces.module';
import { SpacesService } from 'src/spaces/spaces.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoomImage]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    RoomsModule,
    SpacesModule,
  ],
  exports: [TypeOrmModule],
  controllers: [RoomImagesController],
  providers: [RoomImagesService, RoomsService, SpacesService],
})
export class RoomImagesModule {
  constructor(private roomImageService: RoomImagesService) {}
}
