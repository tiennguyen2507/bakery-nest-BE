import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import swaggerConfig from 'config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  swaggerConfig(app);
  await app.listen(process.env.PORT);
}
bootstrap();
