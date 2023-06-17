import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log(process.env.MONGO_DB_URL);
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('CV Generator')
    .setDescription('CV Generator')
    .setVersion('1.0')
    .addTag('cvGen')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cors());
  await app.listen(4000);
}
bootstrap().catch((error) => console.log(error));
