// apps/api/src/admins/admins.controller.ts
import { Controller, Get, Post, Body, Delete, Param, UseGuards, Request } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Ensure this guard exists for Admins
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('admins')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  @Roles('SUPER_ADMIN', 'ADMIN') // Only these can create
  create(@Request() req, @Body() createAdminDto: any) {
    return this.adminsService.create(createAdminDto, req.user.role);
  }

  @Get()
  @Roles('SUPER_ADMIN', 'ADMIN')
  findAll() {
    return this.adminsService.findAll();
  }

  @Delete(':id')
  @Roles('SUPER_ADMIN') // Only Super Admin can delete
  remove(@Param('id') id: string) {
    return this.adminsService.delete(id);
  }
}