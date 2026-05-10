import { Test, TestingModule } from '@nestjs/testing';
import { StadesService } from './stades.service';

describe('StadesService', () => {
  let service: StadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StadesService],
    }).compile();

    service = module.get<StadesService>(StadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
