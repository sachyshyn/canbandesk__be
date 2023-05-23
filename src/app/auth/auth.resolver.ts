import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/models';
import { AuthService } from './auth.service';
import { SigninInput } from './dto';
import { Response } from 'express';
import { CreateUserInput } from '../users/dto/input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { Void } from '@/shared/schemas';
@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User, { name: 'signin' })
  async signin(@Args('signinInput') signinInput: SigninInput, @Context('res') res: Response): Promise<User> {
    const validUser = await this.authService.validate(signinInput.email, signinInput.password);

    return this.authService.signin(validUser, res);
  }

  @Mutation(() => User, { name: 'signup' })
  async signup(@Args('signupInput') createUserInput: CreateUserInput): Promise<User> {
    return this.authService.signup(createUserInput);
  }

  @Mutation(() => Void, { name: 'signout', nullable: true })
  @UseGuards(GqlAuthGuard)
  async signout(@Context('res') res: Response) {
    return this.authService.signout(res);
  }
}
