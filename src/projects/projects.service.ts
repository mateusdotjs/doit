import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dtos/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from './dtos/update-project.dto';
import slugify from '../utils/slugify';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(createProjectsDto: CreateProjectDto) {
    const projectExists = await this.projectsRepository.findOneBy({
      slug: slugify(createProjectsDto.title),
    });

    if (projectExists) {
      throw new ConflictException(
        'Já existe um projeto com este nome cadastrado.',
      );
    }

    //deve-se instanciar entities antes de salvá-las para que funçoes BeforeInsert() e BeforeUpdate() funcionem
    const projectToCreate = this.projectsRepository.create(createProjectsDto);
    return this.projectsRepository.save(projectToCreate);
  }

  async findAll(): Promise<Project[]> {
    return await this.projectsRepository.find();
  }

  async findOne(slug: string): Promise<Project> {
    return await this.projectsRepository.findOneBy({ slug });
  }

  async update(
    updateProjectDto: UpdateProjectDto,
    slug: string,
  ): Promise<Project> {
    const projectToUpdate = await this.projectsRepository.findOneBy({ slug });
    Object.assign(projectToUpdate, updateProjectDto);
    return await this.projectsRepository.save(projectToUpdate);
  }

  async destroy(slug: string): Promise<Project> {
    const projectToRemove = await this.projectsRepository.findOneBy({ slug });
    if (!projectToRemove) {
      throw new NotFoundException('Projeto inexistente');
    }
    return await this.projectsRepository.remove(projectToRemove);
  }
}
