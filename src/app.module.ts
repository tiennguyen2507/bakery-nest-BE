import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'src/config/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

const DataBaseModule = TypeOrmModule.forRoot(dataSourceOptions);

@Module({
  imports: [ConfigModule.forRoot(), DataBaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
