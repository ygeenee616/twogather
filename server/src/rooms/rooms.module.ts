import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/rooms.entity';
import { SpacesModule } from 'src/spaces/spaces.module';
import { PassportModule } from '@nestjs/passport';
import { SpacesService } from 'src/spaces/spaces.service';
import { Space } from 'src/spaces/entities/spaces.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Space]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SpacesModule,
  ],

  exports: [TypeOrmModule],
  controllers: [RoomsController],
  providers: [RoomsService, SpacesService],
})
export class RoomsModule {}
