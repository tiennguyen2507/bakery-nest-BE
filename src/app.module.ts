import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { dataSourceOptions } from 'db/data-source';

const DataBaseModule = TypeOrmModule.forRoot(dataSourceOptions);

@Module({
  imports: [DataBaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
