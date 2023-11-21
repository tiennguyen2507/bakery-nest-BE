import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsEmpty()
  bakeryID: string;
}
