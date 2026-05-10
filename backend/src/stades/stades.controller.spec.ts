import { Test, TestingModule } from '@nestjs/testing';
import { StadesController } from './stades.controller';

describe('StadesController', () => {
  let controller: StadesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StadesController],
    }).compile();

    controller = module.get<StadesController>(StadesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
