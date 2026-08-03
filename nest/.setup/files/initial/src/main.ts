import { NestFactory } from '@nestjs/core';

import { RootModule } from './modules/root.module.js';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
