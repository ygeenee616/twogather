import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { PassportModule } from '@nestjs/passport';
import { SpaceImagesModule } from 'src/space_images/space_images.module';
import { SpaceImagesService } from 'src/space_images/space_images.service';
import { SpacesService } from 'src/spaces/spaces.service';
import { SpacesModule } from 'src/spaces/spaces.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SpaceImagesModule,
    SpacesModule,
  ],
  controllers: [UploadsController],
  providers: [UploadsService, SpaceImagesService, SpacesService],
})
export class UploadsModule {
  constructor(private uploadsService: UploadsService) {}
}
