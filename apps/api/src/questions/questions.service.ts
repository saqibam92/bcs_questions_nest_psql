// apps/api/src/questions/questions.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.QuestionCreateInput) {
    return this.prisma.question.create({
      data,
      include: { section: true }, // Changed from subject
    });
  }

  findAll() {
    return this.prisma.question.findMany({
      include: { 
        section: { 
          include: { exam: true } 
        } 
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id },
      include: { 
        section: { 
          include: { exam: true } 
        } 
      },
    });
  }

  // Updated to find by Section
  findBySection(sectionId: string) {
    return this.prisma.question.findMany({
      where: { sectionId },
      orderBy: { order: 'asc' }, // Changed from ques_no
    });
  }

  update(id: string, data: Prisma.QuestionUpdateInput) {
    return this.prisma.question.update({
      where: { id },
      data,
      include: { section: true },
    });
  }

  remove(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}