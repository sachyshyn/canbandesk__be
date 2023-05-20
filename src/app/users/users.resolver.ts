import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { User } from './models';
import { UsersService } from './users.service';
import { GetUserArgs } from './dto/args';
import { CreateUserInput, DeleteUserInput, UpdateUserInput } from './dto/input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlAuthGuard)
  async getUser(@Args() getUserArgs: GetUserArgs): Promise<User> {
    return this.usersService.getUserById(getUserArgs.userId);
  }

  @Query(() => [User], { name: 'users', nullable: 'items' })
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserData') createUserData: CreateUserInput): Promise<User> {
    return this.usersService.createUser(createUserData);
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserData') updateUserData: UpdateUserInput): Promise<User> {
    return this.usersService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  async deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput): Promise<User> {
    return this.usersService.deleteUser(deleteUserData.userId);
  }
}
