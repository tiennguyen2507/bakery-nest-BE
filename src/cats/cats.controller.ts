import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './create-cat.dto';

@ApiBearerAuth()
@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async getAll(): Promise<any[]> {
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(): Promise<any> {
    return {};
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateCatDto): Promise<any> {
    return this.catsService.create(createUserDto);
  }

  @Put(':id')
  async update(): Promise<any> {
    return true;
  }

  @Delete(':id')
  async delete(): Promise<any> {
    return true;
  }
}
