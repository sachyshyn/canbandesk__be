import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from '../users/models';
import { JwtPayload } from './dto';
import { JWT_SECRET } from './secret';
import { CreateUserInput } from '../users/dto/input';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async signup(createUserInput: CreateUserInput) {
    const doesUserExist = await this.usersService.getUserByEmail(createUserInput.email);

    if (doesUserExist) {
      throw new ForbiddenException('User with this email already exists');
    }

    const hashedPassword = await argon.hash(createUserInput.password);

    const user: Omit<User, 'userId'> = { ...createUserInput, password: hashedPassword };

    return this.usersService.createUser(user);
  }

  async signin(user: User): Promise<{ access_token: string }> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.userId
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async verify(token: string): Promise<User> {
    const decodedToken: JwtPayload = this.jwtService.verify(token, { secret: JWT_SECRET });

    const user = await this.usersService.getUserByEmail(decodedToken.email);

    if (!user) {
      throw new NotFoundException("Couldn't found a user with provided data");
    }

    return user;
  }
}
