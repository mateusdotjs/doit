import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userToCreate = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(userToCreate);
  }

  async findAllByProject(projectSlug: string) {
    return await this.usersRepository.findBy({
      project: { slug: projectSlug },
    });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async update(updateUserDto: UpdateUserDto, id: number) {
    const userToUpdate = await this.usersRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new NotFoundException('Não encontrado.');
    }
    Object.assign(userToUpdate, updateUserDto);
    return await this.usersRepository.save(userToUpdate);
  }

  async remove(id: number) {
    const userToRemove = await this.usersRepository.findOneBy({ id });
    if (!userToRemove) {
      throw new NotFoundException('Usuário não encontrado)');
    }
    return await this.usersRepository.remove(userToRemove);
  }
}
