import { CV } from 'src/cv/cv.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // @OneToMany((type) => CV, (cv) => cv.user, { eager: true }) to include cvs[]
  @OneToMany((type) => CV, (cv) => cv.user)
  cvs: CV[];
}
