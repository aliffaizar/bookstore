import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import { UserController } from 'src/controllers/user.controller';
import { UserService } from 'src/services/user.service';
import { UserResolver } from 'src/resolvers/user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserResolver],
})
export class UserModule {}
