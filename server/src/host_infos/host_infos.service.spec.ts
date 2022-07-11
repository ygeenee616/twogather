import { Test, TestingModule } from '@nestjs/testing';
import { HostInfosService } from './host_infos.service';

describe('HostInfosService', () => {
  let service: HostInfosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostInfosService],
    }).compile();

    service = module.get<HostInfosService>(HostInfosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
