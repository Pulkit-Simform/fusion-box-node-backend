import { Test, TestingModule } from '@nestjs/testing';
import { DsuService } from './dsu.service';

describe('DsuService', () => {
  let service: DsuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DsuService],
    }).compile();

    service = module.get<DsuService>(DsuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
