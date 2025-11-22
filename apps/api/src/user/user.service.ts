// apps/api/src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  // Find user by either email or phone
  async findOneByEmailOrPhone(loginId: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        OR: [{ email: loginId }, { phone: loginId }],
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    
    // In production, you'd want a more robust unique generator
    const uniqueId = "BbcQ" + Math.floor(100 + Math.random() * 900);

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        userId: uniqueId, 
      },
    });
  }

  async updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<User> {
    if (data.password && typeof data.password === 'string') {
       const salt = await bcrypt.genSalt(10);
       data.password = await bcrypt.hash(data.password, salt);
    }
    return this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}