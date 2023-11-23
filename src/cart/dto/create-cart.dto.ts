import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsInt } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsEmpty()
  productID: string;

  @ApiProperty()
  @IsEmpty()
  @IsInt()
  amount: number;
}

export type DataCartCreate = {
  productID: string;
  userID: string;
  amount: number;
};
