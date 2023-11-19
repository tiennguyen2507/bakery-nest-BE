import { Injectable } from '@nestjs/common';
import { CreateBakeryDto } from './dto/create-bakery.dto';
import { UpdateBakeryDto } from './dto/update-bakery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Bakery } from './entities/bakery.entity';
import { Repository } from 'typeorm';
import { pagination } from 'helpers';
import { FilterBakeryDto } from './dto/filter-bakery.dto';

@Injectable()
export class BakeryService {
  constructor(
    @InjectRepository(Bakery) private bakeryRepository: Repository<Bakery>,
  ) {}
  create(createBakeryDto: CreateBakeryDto) {
    return this.bakeryRepository.save(createBakeryDto);
  }

  async findAll({ items_per_page, page, search }: FilterBakeryDto) {
    return await pagination<Bakery>(this.bakeryRepository, {
      items_per_page,
      page,
      search,
      searchBy: ['title', 'description'],
    });
  }

  findOne(id: string) {
    return this.bakeryRepository.findOneBy({ id });
  }

  update(id: number, updateBakeryDto: UpdateBakeryDto) {
    return this.bakeryRepository.update(id, updateBakeryDto);
  }

  remove(id: string) {
    return this.bakeryRepository.delete(id);
  }
}
