import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsEnum(
    [
      'Pendente',
      'Em andamento',
      'Pausado',
      'Aguardando respostas de terceiros',
      'Concluído',
    ],
    {
      message:
        'O campo status deve ser um dos seguintes valores: Pendente, Em andamento, Pausado, Aguardando respostas de terceiros, Concluído',
    },
  )
  status:
    | 'Pendente'
    | 'Em andamento'
    | 'Pausado'
    | 'Aguardando respostas de terceiros'
    | 'Concluído';
}
