import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Configuration } from './configuration';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { ValidationPipe } from './shared/validation.pipe';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  const port = Configuration.getPort();

  // Set up Swagger documentation
  const options = new DocumentBuilder()
    .setTitle('Global Animal Shelter')
    .setDescription('API to manipulate lost and found pets.')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  // Add custom validation pipe
  app.useGlobalPipes(new ValidationPipe());
  // Add custom HTTP exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
  logger.log(`Server listening on port: ${port}`);
}

bootstrap();
