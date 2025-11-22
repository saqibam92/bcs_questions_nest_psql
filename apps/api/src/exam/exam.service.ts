// apps/api/src/exam/exam.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExamService {
  constructor(private prisma: PrismaService) {}

  async getAllExams() {
    return this.prisma.exam.findMany({
      select: {
        id: true,
        name: true, // Changed from exam_name
        slug: true, // Added useful field
        createdAt: true,
      },
      where: {
        isPublished: true, // Only show published exams to users
      },
    });
  }

  async getExamById(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        sections: { // Changed from subjects
          include: {
            questions: true, 
          },
          orderBy: {
            order: 'asc', // Maintain section order
          }
        },
      },
    });

    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }
  
  /**
   * Efficiently get exam structure (Sections only, no questions)
   */
  async getExamWithSections(id: string) {
    const exam = await this.prisma.exam.findUnique({
      where: { id },
      include: {
        sections: {
          select: {
            id: true,
            name: true,
            defaultMarks: true,
          },
          orderBy: {
            order: 'asc',
          }
        },
      },
    });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    return exam;
  }

  // Changed logic: Questions now belong to a Section, not a Subject
  async getQuestionsForSection(sectionId: string) {
    return this.prisma.question.findMany({
      where: { sectionId },
      orderBy: { order: 'asc' }
    });
  }
}