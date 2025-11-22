import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Prisma } from '@prisma/client';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(body: {
        loginId: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
    register(body: Prisma.UserCreateInput): Promise<{
        access_token: string;
        user: any;
    }>;
    getProfile(req: any): {
        user: any;
    };
    updateProfile(req: any, body: Prisma.UserUpdateInput): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string | null;
            userId: string;
            userType: import(".prisma/client").$Enums.UserType;
        };
    }>;
}
export {};
