import { CV } from 'src/cv/cv.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class PersonalDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wantedJobTitle: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  professionalSummary: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @OneToOne(() => CV, (cv) => cv.personalDetails)
  cv: CV;
}
