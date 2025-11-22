import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AdminAuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    validateAdmin(email: string, pass: string): Promise<any>;
    login(admin: any): Promise<{
        access_token: string;
        admin: {
            id: any;
            email: any;
            name: any;
            role: any;
        };
    }>;
}
