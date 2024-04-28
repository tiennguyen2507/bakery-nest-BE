import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as process from 'process';
import swaggerConfig from 'config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: ['http://localhost:3000'] });
  swaggerConfig(app);
  await app.listen(4000);
}
bootstrap();
