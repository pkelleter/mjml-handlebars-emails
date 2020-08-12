import { Test, TestingModule } from '@nestjs/testing';
import { PathsService } from './paths.service';

describe('PathsService', () => {
  let service: PathsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PathsService],
    }).compile();

    service = module.get<PathsService>(PathsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
