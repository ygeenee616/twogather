import { Injectable } from '@nestjs/common';
import { CreateHostInfoDto } from './dto/create-host_info.dto';
import { UpdateHostInfoDto } from './dto/update-host_info.dto';

@Injectable()
export class HostInfosService {
  create(createHostInfoDto: CreateHostInfoDto) {
    return 'This action adds a new hostInfo';
  }

  findAll() {
    return `This action returns all hostInfos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hostInfo`;
  }

  update(id: number, updateHostInfoDto: UpdateHostInfoDto) {
    return `This action updates a #${id} hostInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} hostInfo`;
  }
}
