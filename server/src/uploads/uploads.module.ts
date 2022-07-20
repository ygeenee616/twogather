import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { PassportModule } from '@nestjs/passport';
import { SpaceImagesModule } from 'src/space_images/space_images.module';
import { SpaceImagesService } from 'src/space_images/space_images.service';
import { SpacesService } from 'src/spaces/spaces.service';
import { SpacesModule } from 'src/spaces/spaces.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RoomImagesModule } from 'src/room_images/room_images.module';
import { RoomImagesService } from 'src/room_images/room_images.service';
import { RoomsService } from 'src/rooms/rooms.service';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SpaceImagesModule,
    RoomImagesModule,
    UsersModule,
    SpacesModule,
    RoomsModule,
  ],
  controllers: [UploadsController],
  providers: [
    UploadsService,
    SpaceImagesService,
    RoomImagesService,
    UsersService,
    JwtService,
    SpacesService,
    RoomsService,
  ],
})
export class UploadsModule {
  constructor(private uploadsService: UploadsService) {}
}
