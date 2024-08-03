import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  status:
    | 'Pendente'
    | 'Em andamento'
    | 'Pausado'
    | 'Aguardando respostas de terceiros'
    | 'Concluído';

  @ManyToOne(() => Project, (project) => project.tasks, { onDelete: 'CASCADE' })
  project: Project;
}
