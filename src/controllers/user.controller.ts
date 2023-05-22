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
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

import { Roles } from 'src/decorators/roles.decorator';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserService } from 'src/services/user.service';

@ApiTags('Users')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer <token>',
})
@Controller('users')
@UseGuards(JwtGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('superadmin')
  async getUsers() {
    return await this.userService.findAll();
  }

  @Post()
  @Roles('superadmin')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @Roles('superadmin')
  async getUser(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles('superadmin')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles('superadmin')
  async removeUser(@Param('id') id: number) {
    return await this.userService.remove(id);
  }
}
