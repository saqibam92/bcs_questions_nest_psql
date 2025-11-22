// apps/api/src/subjects/subjects.controller.ts
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
import { SubjectsService } from './subjects.service';
import { AdminAuthGuard } from '../auth/admin-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { AdminRole, Prisma } from '@prisma/client';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Post()
  @Roles(AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  create(@Body() createSubjectDto: Prisma.SubjectCreateInput) {
    return this.subjectsService.create(createSubjectDto);
  }

  @Get()
  findAll() {
    return this.subjectsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectsService.findOne(id);
  }

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles(AdminRole.MODERATOR, AdminRole.ADMIN, AdminRole.SUPER_ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateSubjectDto: Prisma.SubjectUpdateInput,
  ) {
    return this.subjectsService.update(id, updateSubjectDto);
  }

  @UseGuards(AdminAuthGuard, RolesGuard)
  @Delete(':id')
  @Roles(AdminRole.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.subjectsService.remove(id);
  }
}