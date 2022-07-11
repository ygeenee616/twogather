import { Test, TestingModule } from '@nestjs/testing';
import { HostInfosController } from './host_infos.controller';
import { HostInfosService } from './host_infos.service';

describe('HostInfosController', () => {
  let controller: HostInfosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostInfosController],
      providers: [HostInfosService],
    }).compile();

    controller = module.get<HostInfosController>(HostInfosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
