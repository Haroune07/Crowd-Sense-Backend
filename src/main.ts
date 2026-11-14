import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Crowd-Sense API')
    .setDescription(
      'Backend API for protest safety heatmap, urgency photo reports, announcements, roles, and polls.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addGlobalParameters({
      name: 'x-user-role',
      in: 'header',
      required: false,
      description: 'Simulated role header (protester | medic | organizer)',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Crowd-Sense Backend running on http://localhost:${port}/api`);
  console.log(`Swagger Docs available at http://localhost:${port}/api/docs`);
}
bootstrap();
