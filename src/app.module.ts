import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { ConfigModule } from '@nestjs/config';

const DataBaseModule = TypeOrmModule.forRoot(dataSourceOptions);

@Module({
  imports: [ConfigModule.forRoot(), DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
