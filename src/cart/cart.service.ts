import { Injectable } from '@nestjs/common';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { DataCartCreate } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}
  async create(data: DataCartCreate) {
    const resuft = await this.cartRepository.findOne({
      where: { productID: data.productID, userID: data.userID },
    });

    if (resuft) {
      return this.cartRepository.update(resuft.id, {
        ...data,
        amount: data.amount + resuft.amount,
      });
    } else {
      return this.cartRepository.save(data);
    }
  }

  async getAll(userID: string) {
    const data = await this.cartRepository.find({
      where: { userID },
      relations: { product: true },
      select: ['product', 'created_at', 'updated_at', 'amount'],
    });
    return data?.map(({ product, created_at, updated_at, amount }) => ({
      ...product,
      created_at,
      updated_at,
      amount,
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    console.log(updateCartDto);
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
