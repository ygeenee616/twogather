import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/rooms.entity';
import { SpacesModule } from 'src/spaces/spaces.module';
import { SpacesService } from 'src/spaces/spaces.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), SpacesModule],
  exports: [TypeOrmModule],
  controllers: [RoomsController],
  providers: [RoomsService, SpacesService],
})
export class RoomsModule {
  constructor(private roomsService: RoomsService) {}
}
