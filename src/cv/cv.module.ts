import { Module, forwardRef } from '@nestjs/common';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { CV } from './cv.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalDetails } from 'src/personal-details/personal-details.entity';
import { Education } from 'src/education/education.entity';
import { EmploymentHistory } from 'src/employment-history/employment-history.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CV,
      PersonalDetails,
      Education,
      EmploymentHistory,
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [CvController],
  providers: [CvService],
  exports: [CvService],
})
export class CvModule {}
