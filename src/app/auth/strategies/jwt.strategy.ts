import { UsersService } from '@/app/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';
import { JWT_SECRET } from '../secret';
import { JwtPayload } from '../dto';
import { User } from '@/app/users/models';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(private readonly usersService: UsersService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken, ignoreExpiration: false, secretOrKey: JWT_SECRET });
  }

  async validate(payload: JwtPayload): Promise<User | undefined> {
    return this.usersService.getUserByEmail(payload.email);
  }
}
