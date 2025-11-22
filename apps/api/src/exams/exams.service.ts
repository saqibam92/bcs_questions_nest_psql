// apps/api/src/exams/exams.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExamsService {
  constructor(private prisma: PrismaService) {}

  // This now supports the Nested Write (Unified Form)
  create(data: Prisma.ExamCreateInput) {
    return this.prisma.exam.create({
      data,
      include: {
        sections: {
          include: { questions: true }
        }
      }
    });
  }

  findAll() {
    return this.prisma.exam.findMany({
      orderBy: { createdAt: 'desc' },
      // We usually don't need full nested content for the list view
      select: {
        id: true,
        name: true,
        slug: true,
        isPublished: true,
        createdAt: true,
        _count: {
          select: { sections: true }
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.exam.findUnique({ 
      where: { id }, 
      include: { 
        sections: {
          include: { questions: true },
          orderBy: { order: 'asc' }
        } 
      } 
    });
  }

  update(id: string, data: Prisma.ExamUpdateInput) {
    return this.prisma.exam.update({ 
      where: { id }, 
      data,
      include: { sections: true }
    });
  }

  remove(id: string) {
    return this.prisma.exam.delete({ where: { id } });
  }
}