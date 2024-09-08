import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post(':projectSlug')
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('projectSlug') slug: string,
  ): Promise<Task> {
    return this.tasksService.create(createTaskDto, slug);
  }

  @Get(':projectSlug')
  findAllbyProject(@Param('projectSlug') projectSlug: string): Promise<Task[]> {
    return this.tasksService.findAllbyProject(projectSlug);
  }

  @Get(':projectSlug/:id')
  findOnebyProject(
    @Param('projectSlug') projectSlug: string,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.tasksService.findOnebyProject(projectSlug, id);
  }

  @Patch(':id')
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.tasksService.update(updateTaskDto, id);
  }

  @Delete(':id')
  destroy(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.destroy(id);
  }
}
