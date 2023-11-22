import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';

const DataBaseModule = TypeOrmModule.forRoot(dbOptions());

@Module({
  imports: [
    ConfigModule.forRoot(),
    DataBaseModule,
    UserModule,
    AuthModule,
    PostModule,
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
