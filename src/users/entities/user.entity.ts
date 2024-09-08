import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../projects/project.entity';
import { Credential } from '../../auth/credential.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany(() => Project, (project) => project.user, { onDelete: 'CASCADE' })
  project: Project[];

  @OneToOne(() => Credential, (credential) => credential.user)
  credential: Credential;
}
