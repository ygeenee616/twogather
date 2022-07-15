import { Module } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { Space } from './entities/spaces.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Space]), UsersModule],
  exports: [TypeOrmModule],
  controllers: [SpacesController],
  providers: [SpacesService],
})
export class SpacesModule {
  constructor(private spacesService: SpacesService) {}
}
