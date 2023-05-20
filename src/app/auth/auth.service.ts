import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '@/app/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models';
import { JwtPayload } from './dto';
import { JWT_SECRET } from './secret';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = password === user.password;

    return isPasswordValid ? user : null;
  }

  signin(user: User): { access_token: string } {
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
