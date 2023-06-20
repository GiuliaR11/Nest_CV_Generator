import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .addSecurity('bearer', {
      type: 'http',
      scheme: 'bearer',
    })
    .setTitle('CV Generator')
    .setDescription('CV Generator')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cors());
  await app.listen(4000);
}
bootstrap().catch((error) => console.log(error));
