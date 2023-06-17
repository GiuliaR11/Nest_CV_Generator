import { CV } from 'src/cv/cv.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Education {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  institution: string;

  @Column()
  degree: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  city: string;

  @Column()
  description?: string;

  @ManyToOne(() => CV, (cv) => cv.educations)
  cv: CV;
}
