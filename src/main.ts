import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { INIT } from './mapping/constants/mapping.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { OpenAPIObject } from '@nestjs/swagger';

console.log(INIT);
console.log(process.env.PORT);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') ?? 3001;
  const env: string = configService.get<string>('NODE_ENV') ?? 'development';

  const config = new DocumentBuilder()
    .setTitle('CMS')
    .setDescription('Documentation of CMs api services')
    .setVersion('1.0')
    .addTag('main')
    .build();

  const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
  if (env == 'development') {
    const swaggerPrefix: string = 'docs';
    SwaggerModule.setup(swaggerPrefix, app, document);
    Logger.log(
      `📄 Swagger docs is running on: http://localhost:${port}/${swaggerPrefix}`,
      bootstrap.name,
    );
  }

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
