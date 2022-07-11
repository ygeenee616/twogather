import { Module } from '@nestjs/common';
import { HostInfosService } from './host_infos.service';
import { HostInfosController } from './host_infos.controller';

@Module({
  controllers: [HostInfosController],
  providers: [HostInfosService]
})
export class HostInfosModule {}
