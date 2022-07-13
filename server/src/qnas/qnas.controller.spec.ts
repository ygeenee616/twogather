import { Test, TestingModule } from '@nestjs/testing';
import { QnasController } from './qnas.controller';
import { QnasService } from './qnas.service';

describe('QnasController', () => {
  let controller: QnasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QnasController],
      providers: [QnasService],
    }).compile();

    controller = module.get<QnasController>(QnasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
