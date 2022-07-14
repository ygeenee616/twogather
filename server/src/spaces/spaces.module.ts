import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { Space } from './entities/spaces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Space])],
  exports: [TypeOrmModule],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {
  constructor(private spacesService: SpacesService) {}
}
