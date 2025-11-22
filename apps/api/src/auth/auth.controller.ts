// apps/api/src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Put,
  HttpCode,
  HttpStatus,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
// import { JwtAuthGuard } from './jwt-auth.guard'; // We will create this
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

// A simple Guard to protect routes
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: { loginId: string; password: string }) {
    const user = await this.authService.validateUser(body.loginId, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() body: Prisma.UserCreateInput) {
    // Check if user (email or phone) already exists
    const existingUser = await this.userService.findOneByEmailOrPhone(body.email);
    if (existingUser) {
      throw new ConflictException('Email or phone number already in use');
    }
    
    // Check for phone number if provided
    if(body.phone) {
      const existingPhone = await this.userService.findOneByEmailOrPhone(body.phone);
      if (existingPhone) {
        throw new ConflictException('Email or phone number already in use');
      }
    }

    const user = await this.userService.createUser(body);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return this.authService.login(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return { user: req.user }; // req.user is populated by JwtStrategy
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  async updateProfile(@Request() req, @Body() body: Prisma.UserUpdateInput) {
    const user = await this.userService.updateUser(req.user.id, body);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return { user: result };
  }
}