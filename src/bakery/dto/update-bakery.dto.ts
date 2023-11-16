import { PartialType } from '@nestjs/swagger';
import { CreateBakeryDto } from './create-bakery.dto';

export class UpdateBakeryDto extends PartialType(CreateBakeryDto) {}
