import { CV } from 'src/cv/cv.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class EmploymentHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  employer: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  city: string;

  @Column()
  description: string;

  @ManyToOne(() => CV, (cv) => cv.employmentHistories)
  cv: CV;
}
