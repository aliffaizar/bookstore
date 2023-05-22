import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { UserService } from 'src/services/user.service';

@ApiTags('Users')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer <token>',
})
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
