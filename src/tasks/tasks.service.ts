import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private projectsService: ProjectsService,
  ) {}

  async create(createTaskDto: CreateTaskDto, slug: string): Promise<Task> {
    //nomeado como project para que bata com o entity Task
    const project = await this.projectsService.findOne(slug);
    if (!project) {
      throw new NotFoundException('Projeto não encontrado');
    }

    const taskToCreate = this.tasksRepository.create({
      ...createTaskDto,
      status: 'Pendente',
      project,
    });

    return await this.tasksRepository.save(taskToCreate);
  }

  async findAllbyProject(projectSlug: string): Promise<Task[]> {
    return await this.tasksRepository.findBy({
      project: { slug: projectSlug },
    });
  }

  async findOnebyProject(projectSlug: string, id: number): Promise<Task> {
    return await this.tasksRepository.findOneBy({
      project: { slug: projectSlug },
      id,
    });
  }

  async update(updateTaskDto: UpdateTaskDto, id: number): Promise<Task> {
    const taskToUpdate = await this.tasksRepository.findOneBy({
      id,
    });
    if (!taskToUpdate) {
      throw new NotFoundException('Tarefa não encontrada');
    }

    Object.assign(taskToUpdate, updateTaskDto);
    return await this.tasksRepository.save(taskToUpdate);
  }

  async destroy(id: number): Promise<Task> {
    const taskToRemove = await this.tasksRepository.findOneBy({ id });
    if (!taskToRemove) {
      throw new NotFoundException('Tarefa não encontrada');
    }
    return await this.tasksRepository.remove(taskToRemove);
  }
}
