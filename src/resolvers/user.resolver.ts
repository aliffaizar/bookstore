import { Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
