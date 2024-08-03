import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { Project } from './project.entity';

@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Post()
  create(@Body() createProjectsDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectsDto);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.findOne(slug);
  }

  @Put(':slug')
  update(
    @Body() updateProjectDto: UpdateProjectDto,
    @Param('slug') slug: string,
  ): Promise<Project> {
    return this.projectsService.update(updateProjectDto, slug);
  }

  @Delete(':slug')
  destroy(@Param('slug') slug: string): Promise<Project> {
    return this.projectsService.destroy(slug);
  }
}
