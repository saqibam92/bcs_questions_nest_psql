// apps/api/src/exams/exams.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ExamsService } from './exams.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AdminRole } from '@prisma/client';

@Controller('exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  // Secure all admin-only routes
  @UseGuards(AdminAuthGuard, RolesGuard)
  @Post()
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN) // Only Admins can create
  create(@Body() createExamDto: any) { // Use DTOs
    return this.examsService.create(createExamDto);
  }

  // Public route - anyone can see exams
  @Get()
  findAll() {
    return this.examsService.findAll();
  }

  // Public route - anyone can see a single exam
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examsService.findOne(id);
  }

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles(AdminRole.MODERATOR, AdminRole.ADMIN, AdminRole.SUPER_ADMIN) // Moderators can edit
  update(@Param('id') id: string, @Body() updateExamDto: any) {
    return this.examsService.update(id, updateExamDto);
  }

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(AdminRole.SUPER_ADMIN) // Only Super Admins can delete
  remove(@Param('id') id: string) {
    return this.examsService.remove(id);
  }
}