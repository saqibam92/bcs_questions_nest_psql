// apps/api/src/exam/exam.controller.ts
import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ExamService } from './exam.service';

@Controller('exam') // This is the public/user-facing controller
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  async getAllExams() {
    return this.examService.getAllExams();
  }

  @Get(':id')
  async getExamById(@Param('id') id: string) {
    // UPDATED: Now uses Sections logic
    const exam = await this.examService.getExamWithSections(id);
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  @Get('section/:sectionId/questions')
  async getQuestionsForSection(@Param('sectionId') sectionId: string) {
    // UPDATED: Fetch by Section ID
    return this.examService.getQuestionsForSection(sectionId);
  }
}