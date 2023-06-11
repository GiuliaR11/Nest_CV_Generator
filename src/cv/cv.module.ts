import { Module } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CVSchema } from './cv.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cv', schema: CVSchema }])],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService],
})
export class CvModule {}
