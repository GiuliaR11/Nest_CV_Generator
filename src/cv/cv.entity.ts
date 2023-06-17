import { Education } from 'src/education/education.entity';
import { EmploymentHistory } from 'src/employment-history/employment-history.entity';
import { PersonalDetails } from 'src/personal-details/personal-details.entity';
import { User } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class CV {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cvs)
  user: User;

  @OneToOne(() => PersonalDetails, (personalDetails) => personalDetails.cv, {
    eager: true,
  })
  @JoinColumn()
  personalDetails: PersonalDetails;

  @OneToMany(
    () => EmploymentHistory,
    (employmentHistory) => employmentHistory.cv,
    { eager: true },
  )
  employmentHistories: EmploymentHistory[];

  @OneToMany(() => Education, (education) => education.cv, { eager: true })
  educations: Education[];
}
