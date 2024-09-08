import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userEmail')
  findOneByEmail(@Param('userEmail') userEmail: string) {
    return this.usersService.findOneByEmail(userEmail);
  }

  @Get('/projects/:projectSlug')
  findAllByProject(@Param('projectSlug') projectSlug: string) {
    return this.usersService.findAllByProject(projectSlug);
  }

  @Patch(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.usersService.update(updateUserDto, id);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
