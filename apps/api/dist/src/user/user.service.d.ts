import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    findOneByEmailOrPhone(loginId: string): Promise<User | null>;
    createUser(data: Prisma.UserCreateInput): Promise<User>;
    updateUser(userId: string, data: Prisma.UserUpdateInput): Promise<User>;
}
