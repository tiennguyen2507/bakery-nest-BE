import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private useRepository: Repository<User>,
  ) {}

  async findAll(query: FilterUserDto): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * items_per_page;
    const keyWord = query.search || '';
    const [res, total] = await this.useRepository.findAndCount({
      where: [
        { firstName: Like('%' + keyWord + '%') },
        { lastName: Like('%' + keyWord + '%') },
        { email: Like('%' + keyWord + '%') },
      ],
      order: { created_at: 'DESC' },
      take: items_per_page,
      skip: skip,
      select: [
        'id',
        'firstName',
        'lastName',
        'email',
        'status',
        'created_at',
        'updated_at',
        'avatar',
      ],
    });
    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return { data: res, total, currenPage: page, nextPage, prevPage };
  }

  async findOne(id: number): Promise<User> {
    return await this.useRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.useRepository.save(createUserDto);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.useRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.useRepository.delete(id);
  }

  async updateAvatar(id: number, avatar: string): Promise<UpdateResult> {
    return await this.useRepository.update(id, { avatar });
  }
}
