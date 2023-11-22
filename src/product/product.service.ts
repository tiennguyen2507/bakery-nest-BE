import { Injectable } from '@nestjs/common';
import { CreateBakeryDto } from './dto/create-bakery.dto';
import { UpdateBakeryDto } from './dto/update-bakery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pagination } from 'helpers';
import { FilterBakeryDto } from './dto/filter-bakery.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private bakeryRepository: Repository<Product>,
  ) {}
  create(createBakeryDto: CreateBakeryDto) {
    return this.bakeryRepository.save(createBakeryDto);
  }

  async findAll({ items_per_page, page, search }: FilterBakeryDto) {
    return await pagination<Product>(this.bakeryRepository, {
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
