import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ElevatorService } from './elevator/elevator.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

    // Inicializar el elevador
    const elevatorService = app.get(ElevatorService);
    await elevatorService.initializeElevator();

  // Configurar CORS
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configurar Swagger en /documentation
  const config = new DocumentBuilder()
    .setTitle('We are Dev Test API')
    .setDescription('API para el manejo de un ascensor')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // Iniciar servidor
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
