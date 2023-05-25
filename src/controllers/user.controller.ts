import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserApi,
  DeleteUserApi,
  GetUserApi,
  GetUsersApi,
  UpdateUserApi,
} from 'src/decorators/docs/user.api';

import { Roles } from 'src/decorators/roles.decorator';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserService } from 'src/services/user.service';

@ApiTags('Users')
@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('superadmin')
  @GetUsersApi()
  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Roles('superadmin')
  @CreateUserApi()
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Roles('superadmin')
  @GetUserApi()
  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Roles('superadmin')
  @UpdateUserApi()
  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Roles('superadmin')
  @DeleteUserApi()
  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
