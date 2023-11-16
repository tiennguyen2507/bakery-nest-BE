import { Test, TestingModule } from '@nestjs/testing';
import { BakeryController } from './bakery.controller';
import { BakeryService } from './bakery.service';

describe('BakeryController', () => {
  let controller: BakeryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BakeryController],
      providers: [BakeryService],
    }).compile();

    controller = module.get<BakeryController>(BakeryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
