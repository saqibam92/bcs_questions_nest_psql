// apps/api/src/subjects/subjects.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubjectsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.SubjectCreateInput) {
    return this.prisma.subject.create({
      data,
    });
  }

  findAll() {
    return this.prisma.subject.findMany({
      orderBy: { name: 'asc' },
      // Included sections to see where this subject is used
      include: { sections: true } 
    });
  }

  findOne(id: string) {
    return this.prisma.subject.findUnique({
      where: { id },
      include: { sections: true },
    });
  }

  update(id: string, data: Prisma.SubjectUpdateInput) {
    return this.prisma.subject.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.subject.delete({ where: { id } });
  }
}