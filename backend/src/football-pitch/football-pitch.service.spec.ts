import { Test, TestingModule } from '@nestjs/testing';
import { FootballPitchService } from './football-pitch.service';

describe('FootballPitchService', () => {
  let service: FootballPitchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FootballPitchService],
    }).compile();

    service = module.get<FootballPitchService>(FootballPitchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
