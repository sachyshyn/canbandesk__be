import { UsersService } from '@/app/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy as PassportJwtStrategy } from 'passport-jwt';
import { JWT_SECRET } from '../secret';
import { JwtPayload } from '../dto';
import { User } from '@/app/users/models';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(PassportJwtStrategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwtFromCookie]),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET
    });
  }

  private static extractJwtFromCookie(req: Request): string | null {
    if (req.cookies?.access_token?.length > 0) {
      return req.cookies.access_token;
    }

    return null;
  }

  async validate(payload: JwtPayload): Promise<User | undefined> {
    return this.usersService.getUserWithPasswordByEmail(payload.email);
  }
}
