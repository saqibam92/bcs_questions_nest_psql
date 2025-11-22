// apps/api/src/questions/questions.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Prisma } from '@prisma/client';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() data: Prisma.QuestionCreateInput) {
    return this.questionsService.create(data);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  // UPDATED: Changed parameter to sectionId and method call
  @Get('section/:sectionId')
  findBySection(@Param('sectionId') sectionId: string) {
    return this.questionsService.findBySection(sectionId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.QuestionUpdateInput) {
    return this.questionsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}