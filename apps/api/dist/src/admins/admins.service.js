"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AdminsService = class AdminsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, creatorRole) {
        if (creatorRole !== 'SUPER_ADMIN') {
            if (data.role === 'SUPER_ADMIN' || data.role === 'ADMIN') {
                throw new common_1.ForbiddenException('You are not authorized to create this role.');
            }
        }
        const existing = await this.prisma.admin.findUnique({ where: { email: data.email } });
        if (existing)
            throw new common_1.ConflictException('Email already exists');
        const hashedPassword = await bcrypt.hash(data.password, 10);
        return this.prisma.admin.create({
            data: Object.assign(Object.assign({}, data), { password: hashedPassword }),
            select: { id: true, name: true, email: true, role: true, createdAt: true },
        });
    }
    async findAll() {
        return this.prisma.admin.findMany({
            select: { id: true, name: true, email: true, role: true, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async delete(id) {
        return this.prisma.admin.delete({ where: { id } });
    }
};
exports.AdminsService = AdminsService;
exports.AdminsService = AdminsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminsService);
//# sourceMappingURL=admins.service.js.map