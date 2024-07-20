import { Test, TestingModule } from '@nestjs/testing';
import { DsuController } from './dsu.controller';
import { DsuService } from './dsu.service';

describe('DsuController', () => {
  let controller: DsuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DsuController],
      providers: [DsuService],
    }).compile();

    controller = module.get<DsuController>(DsuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
