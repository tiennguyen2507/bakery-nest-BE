import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, MaxLength } from 'class-validator';
import { Size } from 'enum';

export class CreateBakeryDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsEnum(Size)
  @IsNotEmpty()
  size: Size;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
