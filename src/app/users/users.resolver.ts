import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './models';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args';
import { UpdateUserInput } from './dto/input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUserById(getUserArgs.id);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  @UseGuards(GqlAuthGuard)
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<User> {
    return this.usersService.updateUser(updateUserData);
  }
}
