import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { DatabaseModule } from './database/database.module';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { PostModule } from './post/post.module';
// import { CartModule } from './cart/cart.module';
// import { ProductModule } from './product/product.module';

@Module({
  // imports: [UserModule, AuthModule, PostModule, ProductModule, CartModule],
  imports: [DatabaseModule, CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
