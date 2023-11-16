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

  findOne(id: number) {
    return `This action returns a #${id} bakery`;
  }

  update(id: number, updateBakeryDto: UpdateBakeryDto) {
    console.log(updateBakeryDto);
    return `This action updates a #${id} bakery`;
  }

  remove(id: number) {
    return `This action removes a #${id} bakery`;
  }
}
