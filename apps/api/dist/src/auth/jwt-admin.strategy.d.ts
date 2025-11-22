import { Strategy } from 'passport-jwt';
import { AdminRole } from '@prisma/client';
declare const JwtAdminStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtAdminStrategy extends JwtAdminStrategy_base {
    constructor();
    validate(payload: {
        sub: string;
        email: string;
        role: AdminRole;
    }): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.AdminRole;
    }>;
}
export {};
