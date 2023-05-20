import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../users/models';
import { AuthService } from './auth.service';
import { SigninInput } from './dto';
import { AccessToken } from './models';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AccessToken)
  async signin(@Args('signin') signinInput: SigninInput): Promise<{ access_token: string }> {
    const validUser = await this.authService.validate(signinInput.email, signinInput.password);

    return this.authService.signin(validUser);
  }
}
