import { AdminsService } from './admins.service';
export declare class AdminsController {
    private readonly adminsService;
    constructor(adminsService: AdminsService);
    create(req: any, createAdminDto: any): Promise<{
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
    remove(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.AdminRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
