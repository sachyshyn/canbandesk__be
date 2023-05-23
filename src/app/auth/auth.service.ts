import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { User } from '../users/models';
import { JwtPayload } from './dto';
import { JWT_SECRET } from './secret';
import { CreateUserInput } from '../users/dto/input';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validate(email: string, password: string): Promise<User> {
    const user = await this.usersService.getUserWithPasswordByEmail(email);

    if (!user) {
      throw new NotFoundException('User with this email not found');
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const userCopy = { ...user };

    delete userCopy.password;

    return userCopy;
  }

  async signup(createUserInput: CreateUserInput): Promise<User> {
    const doesUserExist = await this.usersService.getUserWithPasswordByEmail(createUserInput.email);

    if (doesUserExist) {
      throw new ForbiddenException('User with this email already exists');
    }

    const hashedPassword = await argon.hash(createUserInput.password);

    const user: CreateUserInput = { ...createUserInput, password: hashedPassword };

    return this.usersService.createUser(user);
  }

  async signin(user: User, res: Response): Promise<User> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id
    };

    const access_token = this.jwtService.sign(payload);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400)
    });

    return user;
  }

  async verify(token: string): Promise<User> {
    const decodedToken: JwtPayload = this.jwtService.verify(token, { secret: JWT_SECRET });

    const user = await this.usersService.getUserWithPasswordByEmail(decodedToken.email);

    if (!user) {
      throw new NotFoundException("Couldn't find a user with provided data");
    }

    return user;
  }

  async signout(res: Response) {
    res.clearCookie('access_token');
  }
}
