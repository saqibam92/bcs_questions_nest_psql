// apps/api/src/auth/jwt-admin.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AdminRole } from '@prisma/client';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'YOUR_ADMIN_SECRET_KEY',
    });
  }

  // This payload is from the login service
  async validate(payload: { sub: string; email: string; role: AdminRole }) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}