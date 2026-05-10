import { Test, TestingModule } from '@nestjs/testing';
import { FootballPitchController } from './football-pitch.controller';

describe('FootballPitchController', () => {
  let controller: FootballPitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FootballPitchController],
    }).compile();

    controller = module.get<FootballPitchController>(FootballPitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
