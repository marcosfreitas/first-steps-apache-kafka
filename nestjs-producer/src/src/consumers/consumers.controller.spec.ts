import { Test, TestingModule } from '@nestjs/testing';
import { ConsumersController } from './consumers.controller';

describe('ConsumersController', () => {
  let controller: ConsumersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumersController],
    }).compile();

    controller = module.get<ConsumersController>(ConsumersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
