import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initI18next } from './i18n/i18next.config';

async function bootstrap() {
  // Initialize i18next before starting the app
  await initI18next();
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 2000);
}
bootstrap();
