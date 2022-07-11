import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HostInfosService } from './host_infos.service';
import { CreateHostInfoDto } from './dto/create-host_info.dto';
import { UpdateHostInfoDto } from './dto/update-host_info.dto';

@Controller('host-infos')
export class HostInfosController {
  constructor(private readonly hostInfosService: HostInfosService) {}

  @Post()
  create(@Body() createHostInfoDto: CreateHostInfoDto) {
    return this.hostInfosService.create(createHostInfoDto);
  }

  @Get()
  findAll() {
    return this.hostInfosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostInfosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHostInfoDto: UpdateHostInfoDto) {
    return this.hostInfosService.update(+id, updateHostInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hostInfosService.remove(+id);
  }
}
