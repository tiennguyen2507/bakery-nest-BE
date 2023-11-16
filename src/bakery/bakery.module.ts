import { Module } from '@nestjs/common';
import { BakeryService } from './bakery.service';
import { BakeryController } from './bakery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bakery } from './entities/bakery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bakery])],
  controllers: [BakeryController],
  providers: [BakeryService],
})
export class BakeryModule {}
