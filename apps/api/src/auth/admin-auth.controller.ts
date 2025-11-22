// apps/api/src/auth/admin-auth.controller.ts

import { Controller, Post, Body, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';

@Controller('auth/admin')
export class AdminAuthController {
  constructor(private adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(@Body() loginDto: any) { // Create a DTO for this
    const admin = await this.adminAuthService.validateAdmin(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.adminAuthService.login(admin);
  }
}   