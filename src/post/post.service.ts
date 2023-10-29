import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(userID: number, createPostDto: CreatePostDto): Promise<Post> {
    try {
      const user = await this.userRepository.findOneBy({ id: userID });
      const res = await this.postRepository.save({
        ...createPostDto,
        user: user,
      });

      return await this.postRepository.findOneBy({ id: res.id });
    } catch (error) {
      console.log(error);

      throw new HttpException('can not create post', HttpStatus.BAD_REQUEST);
    }
  }
}
