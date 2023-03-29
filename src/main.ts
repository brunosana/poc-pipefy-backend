import { RootModule } from '@di/root.module';
import { ConsoleLogger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ApiInterceptor } from './interceptors/api.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
  });

  app.enableCors({
    origin: '*',
  });

  app.useGlobalInterceptors(new ApiInterceptor(new ConsoleLogger()));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
