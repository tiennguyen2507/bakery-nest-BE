import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateBakeryDto } from './dto/create-bakery.dto';
import { UpdateBakeryDto } from './dto/update-bakery.dto';
import { FilterBakeryDto } from './dto/filter-bakery.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly bakeryService: ProductService) {}

  @Post()
  create(@Body() createBakeryDto: CreateBakeryDto) {
    return this.bakeryService.create(createBakeryDto);
  }

  @Get()
  findAll(@Query() query: FilterBakeryDto) {
    return this.bakeryService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bakeryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBakeryDto: UpdateBakeryDto) {
    return this.bakeryService.update(+id, updateBakeryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bakeryService.remove(id);
  }
}
