import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Credential } from './credential.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(Credential)
    private authRepository: Repository<Credential>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const userExists = await this.usersService.findOneByEmail(
      registerUserDto.email,
    );
    if (userExists) {
      throw new ConflictException('Email já cadastrado');
    }

    const credentialToCreate = this.authRepository.create(registerUserDto);
    await this.authRepository.save(credentialToCreate)

    const userToCreate = {
      name: registerUserDto.name,
      email: registerUserDto.email,
      credentialToCreate,
    };

    return await this.usersService.create(userToCreate);
  }
}
