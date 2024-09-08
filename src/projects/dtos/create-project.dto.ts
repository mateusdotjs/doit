import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsDateString()
  deadline: string;
}
