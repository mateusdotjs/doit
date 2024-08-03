import { IsDateString, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  deadline: string;
}
