import { PrismaService } from '../prisma/prisma.service';
export declare class AdminsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any, creatorRole: string): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.AdminRole;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.AdminRole;
        createdAt: Date;
    }[]>;
    delete(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.AdminRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
