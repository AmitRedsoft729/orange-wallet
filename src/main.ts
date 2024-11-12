import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configDotenv } from 'dotenv';
import { ConfigService } from '@nestjs/config';

configDotenv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);

  await app.listen(3001, () => {
    console.log(`Server running PORT: ${port}`)
  });



}
bootstrap();
