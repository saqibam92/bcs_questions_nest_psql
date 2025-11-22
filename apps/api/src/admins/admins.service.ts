// apps/api/src/admins/admins.service.ts
import { Injectable, ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any, creatorRole: string) {
    // 1. Check Hierarchy: Admins cannot create Super Admins or other Admins
    if (creatorRole !== 'SUPER_ADMIN') {
      if (data.role === 'SUPER_ADMIN' || data.role === 'ADMIN') {
        throw new ForbiddenException('You are not authorized to create this role.');
      }
    }

    // 2. Check uniqueness
    const existing = await this.prisma.admin.findUnique({ where: { email: data.email } });
    if (existing) throw new ConflictException('Email already exists');

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.admin.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true }, // Don't return password
    });
  }

  async findAll() {
    return this.prisma.admin.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async delete(id: string) {
    return this.prisma.admin.delete({ where: { id } });
  }
}